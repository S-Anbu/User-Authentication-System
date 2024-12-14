const nodemailer = require("nodemailer");
const otpTemplate = require("./EmailTemplate.js");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: "anbarasans750@gmail.com", // Your email
      pass: "dtnt xhks pxrf hawk",
    },
  });
  
  // Function to send verification email
  const sendVerificationCode = async (email, verificationCode) => {
    const mailOptions = {
      from: "anbarasans750@gmail.com", // Sender's email
      to: email, // Receiver's email
      subject: "Verify Your Email",
      text: `Verify Your Email `,
      html: otpTemplate.replace("{verificationCode}", verificationCode),
    };
  
    try {
      await transporter.sendMail(mailOptions);
      console.log(`Verification code sent to ${email}`);
    } catch (error) {
      console.error("Error sending verification email:", error);
    }
  };

  module.exports = sendVerificationCode