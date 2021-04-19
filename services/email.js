randomToken = require('random-token');
const nodemailer = require('nodemailer');
exports.sendMail = async function(to, subject, content, url) {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: "gunostoresaigon@gmail.com",
            pass: "gunosaigon2020",
        }
    });
    const info = await transporter.sendMail({
        from: process.env.EMAIL,
        to,
        subject,
        text: content,
    }).catch(err => console.log(err));
};