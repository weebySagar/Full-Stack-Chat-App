const Sequelize = require('sequelize');
const db = require('../db/database');

const Chat = db.define('chat', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    users: {
        type: Sequelize.JSON,
        allowNull: false
    },
    isGroup: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    groupAdminId: {
        type: Sequelize.JSON,
        allowNull: true
    },
    latestMessageId: {
        type: Sequelize.INTEGER,
        allowNull: true,
    },
    chatName: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    imageUrl: {
        type: Sequelize.STRING,
        allowNull: true
    }
})


module.exports = Chat;