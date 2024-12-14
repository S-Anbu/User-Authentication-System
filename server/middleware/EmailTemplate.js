 const otpTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      width: 100%;
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .header {
      background-color: #fb8c00;
      color: #ffffff;
      text-align: center;
      padding: 20px;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
    }
    .content {
      padding: 20px;
      text-align: center;
      color: #333333;
    }
    .content p {
      margin: 0 0 15px;
      font-size: 16px;
    }
    .otp {
      display: inline-block;
      margin: 20px 0;
      padding: 12px 24px;
      font-size: 20px;
      color: #fb8c00;
      background-color: #f9f9f9;
      border: 1px solid #fb8c00;
      border-radius: 5px;
      font-weight: bold;
    }
    .footer {
      padding: 10px;
      text-align: center;
      font-size: 14px;
      color: #777777;
      background-color: #f9f9f9;
    }
    .footer a {
      color: #007BFF;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Email Verification</h1>
    </div>
    <div class="content">
      <p>Hello,</p>
      <p>Use the following OTP to verify your email address:</p>
      <div class="otp">{verificationCode}</div>
      <p>This OTP is valid for 10 minutes. Please do not share it with anyone.</p>
        </div>
    <div class="footer">
      <p>&copy; 2024 Your Company Name. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`
module.exports=otpTemplate