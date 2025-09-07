export const verificationMailTemplate = (verificationToken) => {
  return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        *{
            padding: 0;
            margin: 0;
            box-sizing: border-box;
        }
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f4f4f4;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            width: 100vw;
        }
        .container {
            background-color: #fff;
        }
        .container .title {
            background-color: #4CAF50;
            color: white;
            padding: 10px;
            text-align: center;
            font-size: 30px;
        }
        .content {
            padding: 20px;
        }
        .code {
            font-size: 24px;
            font-weight: bold;
            color: #333;
            text-align: center;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="container">
       <h1 class="title">Verify Your Email</h1>
       <div class="content">
        <p>Hello</p>
        <p>Thank you for registering. Please verify your email by clicking the link below:</p>
        <h1 class="code">${verificationToken}</h1>
        <p>Enter this code on the verification page to complete the registration</p>
        <p>This code will expire in 15 minutes for security reasons</p>
        <p>If you didn't create an account with us, please ignore this email</p>
        <p>Best regards,</p>
        <p>Your Company Team</p>
       </div>
    </div>
</body>
</html>
    `;
};
