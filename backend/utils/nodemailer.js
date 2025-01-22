const nodemailer = require('nodemailer');
const catchAsyncError = require('../middlewares/catchAsyncError');

const transport = nodemailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    service: process.env.SMPT_SERVICE,
    secure: true,
    debug: true,
    auth: {
        user: process.env.SMPT_MAIL,
        pass: process.env.SMPT_PASSWORD,
      },
})

const sendMail = catchAsyncError(async (email, secretToken, mode) => {
   
        if (mode == 'OTP') {
            
          const info = await transport.sendMail({
                from: process.env.SMPT_MAIL,
                to: email,
                subject: "OTP Submission",
                html: `
        <h1>Validate Yourself</h1>
        <p> Here is your otp ${secretToken} </p>
      `
            })
            console.log("Message sent: %s", info.messageId);

        }
        
})

module.exports = sendMail  