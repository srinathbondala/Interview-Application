require('dotenv').config();
var nodemailer = require('nodemailer');
// Email service
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
  });
  
  const sendEmail = async (toUser, subject1, text1) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to : toUser,
        subject: subject1,
        text: text1,
    };
  
    try {
        const info = await transporter.sendMail(mailOptions,(error, info)=>{
            if(error){
                console.log(error);
            }
            else{
                console.log('Email sent');
            }
        });
        console.log('Email sent: ' + info);
    } catch (error) {
        console.error('Error sending email:', error);
    }
  };

  module.exports = {sendEmail};