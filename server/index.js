const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dbConnect = require("./db.js");
const userModel = require("./model/userSchema.js");
const bcrypt = require("bcrypt");
const sendVerificationCode = require("./middleware/vcode.js");
const resendVerificationCode = require("./middleware/resendCode.js");
const forgetPasswordLink = require("./middleware/forgetpassword.js");
const jwt = require("jsonwebtoken");
const authenticate = require("./middleware/authenticate.js");

const PORT = 2000;
const SECRET_KEY = "secret_key";
const app = express();

app.use(cookieParser());
app.use(cors({origin: "http://localhost:5173",credentials: true,}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
dbConnect();

app.post("/register", async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  // if (!name || !email || !password || !confirmPassword) {
  //   return res.status(400).json(`required cardinalities`);
  // }
  if (password !== confirmPassword) {
    return res.status(400).json(`Passwords do not match`);
  }
  try {
    const hashedpassword = bcrypt.hashSync(password, 10); // hash password
    const verificationcode = Math.floor(
      100000 + Math.random() * 900000
    ).toString(); //6 digit code
    const isVerified = "false";
    const user = await userModel.findOne({ email });
    if (user) {
      res.status(409).json({ message: "** User Already Registered" });
      return console.log(`user already registered`);
    }
    sendVerificationCode(email, verificationcode);
    const newUser = await new userModel({
      name,
      email,
      password: hashedpassword,
      verificationcode,
      isVerified,
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
    console.log(`name:${name} email:${email}`);
    console.log("User registered successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to register user" });
  }
});

app.post("/verify-otp", async (req, res) => {
  const { otp } = req.body;

  if (!otp || otp.length !== 6) {
    return res.status(400).send("OTP are required");
  }
  try {
    const user = await userModel.findOne({ verificationcode: otp });

    if (!user) {
      return res.status(404).send("Invalid OTP");
    }

    if (user.verificationcode === otp) {
      user.isVerified = "true";
      const token = jwt.sign({ id: user._id , email:user.email}, SECRET_KEY);
      user.token = token;
      user.verificationcode = null;
      await user.save();
      res.status(200).json({ message: "OTP verified successfully" });
      console.log(`OTP verified successfully`);
    } else {
      res.status(400).send("Invalid OTP");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to verify OTP" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {

    const user = await userModel.findOne({ email: email });
    if (!user) {
     return res.status(400).json({ message: "Invalid Email Address" });
    }
    
    const hashedpassword = await bcrypt.compare(password, user.password);
    if (!hashedpassword) {
      return res.status(400).json({ message: "Incorrect Password" });
    }
const token = user.token
      if (!token) {
        await userModel.deleteOne( {_id:user._id});
        return res.status(400).json({ message: "Please verify with otp and then Login" });
      }

      res.cookie("authToken", token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000, // 1 hour
        // maxAge:  60000, // 1 min
      });

      await user.save();
      return res.status(200).json({ message: "logged in Successfully", token });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
    
  }
});

app.get("/get-user",authenticate, async (req, res) => {
  const token = req.cookies.authToken;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);

    console.log(` from  get ${decoded.id}`);
    

    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ name: user.name, email: user.email });
  } catch (error) {
    res.status(400).json({ message: "Invalid or Expired Token" });
  }
});

app.post("/logout", (req, res) => {
  res.clearCookie("authToken", { httpOnly: true });
  return res.status(200).json({ message: "Logged out successfully" });
});

app.post("/ForgetPassword", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(201).json({ message: "Invalid Email / User" });
    }
    const ForgetToken = jwt.sign({id:user._id, email:user.email }, SECRET_KEY);
     user.ForgetToken = ForgetToken
    const resetLink = `http://localhost:5173/ResetPassword/${ForgetToken}`;
    forgetPasswordLink(email, resetLink);
    await user.save();
    res
      .status(200)
      .json({
        message: `Reset Password link sent to ${email} Please check Email `,
      });
  } catch (error) {
    console.log(`error in : ${error}`);
  }
});

app.post("/reset-password", async (req, res) => {
  const { newPassword, ForgetToken } = req.body;
  try {
    const user = await userModel.findOne({ ForgetToken:ForgetToken });
    if (!user) {
      return res.status(400).json({ message: " 1 Invalid token" });
    }
    const decode= jwt.verify(ForgetToken,SECRET_KEY)
    if (user._id==decode.id) {
      
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      const newtoken = jwt.sign({ id: user._id }, SECRET_KEY);
      user.token = newtoken;
      await user.save();
      res.status(200).json({ message: `Password Reseted Successfully` });
    }
  } catch (error) {
    console.log(error);
    if (error) {
      res.status(500).json({ message: `Server Error` });
    }
  }
});

app.post("/resend-OTP", async (req, res) => {
  const { email } = req.body;
  const user = await userModel.findOne({ email: email });

  if (!user) {
    return res.status(400).json({ message: "Invalid Email" });
  }
  const resendCode = Math.floor(100000 + Math.random() * 900000).toString();
  resendVerificationCode(email, resendCode);
  user.verificationcode = resendCode;
  user.save();
  res.status(200).json({ message: `OTP Sent to ${email}` });
});

app.listen(PORT, () => console.log(`server is running at ${PORT}`));
