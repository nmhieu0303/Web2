const { Sequelize } = require('sequelize');
module.exports = new Sequelize(process.env.DATABASE_URL || 'postgres://postgres:1@localhost:5432/todo');