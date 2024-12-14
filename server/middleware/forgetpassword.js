const nodemailer = require("nodemailer");
const resetPasswordTemplate= require('./resetPasswordTemplate')

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
  const forgetPasswordLink = async (email ,resetLink) => {
    const mailOptions = {
      from: "anbarasans750@gmail.com", // Sender's email
      to: email, // Receiver's email
      subject: "Reset Password Link",
      text: `Reset Password Link `,
      html: resetPasswordTemplate.replace("{{RESET_PASSWORD_LINK}}",resetLink),
    };
  
    try {
      await transporter.sendMail(mailOptions);
      console.log(`Forgotten password link sent to ${email}`);
    } catch (error) {
      console.error("Error sending Forgotten password link email:", error);
    }
  };

  module.exports = forgetPasswordLink