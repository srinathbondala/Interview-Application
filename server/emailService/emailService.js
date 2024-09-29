require('dotenv').config();
var nodemailer = require('nodemailer');
// Email service
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'interviewtrackapplication@gmail.com',
        pass: 'InterviewTrack@123'
    },
  });
  
  const sendEmail = async (toUSer, subject1, text1) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to : toUSer,
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
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
  };

  module.exports = {sendEmail};