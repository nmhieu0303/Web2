const { DataTypes } = require('sequelize');
const db = require('./db');

const User = db.define('User', {
    // Model attributes are defined here
    displayName: {
        type: DataTypes.STRING
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
            // allowNull defaults to true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
            // allowNull defaults to true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
            // allowNull defaults to true
    },
    active: {
        type: DataTypes.STRING,
    }
});

// const users = [{
//     id: 1,
//     displayName: 'Nguyễn Minh Hiếu',
//     username: '18600087',
//     email: 'abc@gmail.com',
//     password: '$2b$10$D5irnf26qmmfNC7vEqeDMeTnVNiES/nWVS9.FqUaR8sFMjIi3tnmq'
// }, {
//     id: 2,
//     displayName: 'Ronadol',
//     username: 'abc',
//     email: 'abc@gmail.com',
//     password: 'abc'
// }, {
//     id: 3,
//     displayName: 'Neymar',
//     username: '1860008',
//     email: 'abc@gmail.com',
//     password: '$2b$10$D5irnf26qmmfNC7vEqeDMeTnVNiES/nWVS9.FqUaR8sFMjIi3tnmq'
// }];


User.findByUsername = async function(username) {
    return User.findOne({
        where: {
            username,
        },
    });
};

User.findByEmail = async function(email) {
    return User.findOne({
        where: {
            email,
        },
    });
}

User.findById = async function(id) {
    return User.findByPk(id);
}
module.exports = User;