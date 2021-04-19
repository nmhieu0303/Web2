// const { Sequelize, Model, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('postgres://postgres:1@localhost:5432/todo');

// (async function() {
//     try {
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.');
//         const User = sequelize.define('User', {
//             // Model attributes are defined here
//             firstName: {
//                 type: DataTypes.STRING,
//                 allowNull: false
//             },
//             lastName: {
//                 type: DataTypes.STRING
//                     // allowNull defaults to true
//             }
//         }, {
//             // Other model options go here
//         });
//         await sequelize.sync();

//         const users = await User.findAll();
//         console.log(users);

//         // await User.create({
//         //     firstName: 'Nguyễn',
//         //     lastName: 'Hiếu'
//         // })

//     } catch (error) {
//         console.error('Unable to connect to the database:', error);
//     }
// })().catch(console.error);


const nodemailer = require('nodemailer');
exports.sendMail = async function(to, subject, content) {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        }
    });

    const info = await transporter.sendMail({
        from: process.env.EMAIL,
        to,
        subject,
        text: content,
        //html: "<b>Hello world?</b>"
    });
};