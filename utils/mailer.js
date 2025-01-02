const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',  
    auth: {
        user: process.env.EMAIL_USER,  
        pass: process.env.EMAIL_PASS  
    }
});

 
const sendMail = async (to, subject, text,  html) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
            html,
        });
    } catch (error) {
        console.error('Error sending email:', error);
        throw error; 
    }
};
module.exports = { sendMail ,  };