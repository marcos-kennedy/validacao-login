const Sequelize = require('sequelize')
const database = require('../database/db')

const Usuario = database.define('usuario',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    username: {
        type: Sequelize.STRING,
        allowNull: false
    },

    password:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Usuario