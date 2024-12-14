const resetPasswordTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            border: 1px solid #ddd;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background: #fb8c00;
            color: #ffffff;
            text-align: center;
            padding: 20px;
        }
        .content {
            padding: 20px;
            line-height: 1.6;
            color: #333333;
        }
        a:link {
            color: #ffffff;
        }
        a:visited {
            color: #ffffff;
        }

        .button {
            display: block;
            width: fit-content;
            margin: 20px auto;
            padding: 12px 25px;
            background-color: #fb8c00;
            color: #ffffff;
            text-decoration: none;
            font-size: 16px;
            font-weight: bold;
            border-radius: 4px;
            text-align: center;
        }
        .button:hover {
            background-color: orange;
        }
        .footer {
            background: #f9f9f9;
            padding: 15px;
            text-align: center;
            font-size: 12px;
            color: #666;
        }
        .footer a {
            color: #4caf50;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Password Reset Request</h1>
        </div>
        <div class="content">
            <p>Hello,</p>
            <p>We received a request to reset your password. Please click the button below to reset your password:</p>
            <a style="color: #ffffff; " href="{{RESET_PASSWORD_LINK}}" class="button">Reset Password</a>
            <p>If you did not request this change, you can safely ignore this email. Your password will remain the same.</p>
            <p>Thank you,<br>The [Your Company] Team</p>
        </div>
        <div class="footer">
            <p>If you need further assistance, please contact support</a>.</p>
            <p>&copy; 2024 [Your Company]. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;
module.exports = resetPasswordTemplate;
