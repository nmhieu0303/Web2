const { DataTypes } = require('sequelize');
const db = require('./db');
const User = require('./user');

const Todo = db.define('Todo', {
    // Model attributes are defined here
    name: {
        type: DataTypes.STRING,
        allowNull: false
            // allowNull defaults to true
    },
    done: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
            // allowNull defaults to true
    }
});

// const toDoList = [{
//         content: 'Công việc 1',
//         status: 'Hoàn thành'
//     },
//     {
//         content: 'Công việc 2',
//         status: 'Chưa thực hiện'
//     },
//     {
//         content: 'Công việc 3',
//         status: 'Hoàn thành'
//     },
// ];

// Todo.belongsTo(User);
// User.hasMany(Todo);

module.exports = Todo;