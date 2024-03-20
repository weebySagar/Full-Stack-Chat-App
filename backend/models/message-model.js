const Sequelize = require('sequelize');

const db = require('../db/database');
const User = require('./user-model');


const Message = db.define('message', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: true,
    },
    timeStamp: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false
    },
    chatId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
});

User.hasMany(Message);
Message.belongsTo(User);

module.exports = Message