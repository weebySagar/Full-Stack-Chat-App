const  Sequelize  = require('sequelize');
const db = require('../db/database');

const Group = db.define('group',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name:{
        type:Sequelize.STRING,
        allowNull: false
    },
    admin:{
        type:Sequelize.INTEGER,
        allowNull: true
    }
})

module.exports = Group;