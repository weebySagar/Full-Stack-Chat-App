const Sequelize = require('sequelize');
const db = require('../db/database');
const User = require('./user-model');
const Message = require('./message-model');

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
        // references: {
        //     model: 'messages',
        //     key: 'id'
        // }
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

// Chat.belongsToMany(User, { through: 'UserChat', as: 'users' });
// Chat.belongsTo(User,{foreignKey:'groupAdminId',as:'groupAdmin'});
// Chat.belongsTo(User,{foreignKey:'groupUsersId',as:'groupUsers'});

// Chat.hasMany(Message, { foreignKey: 'chatId', as: 'messages' });
// Chat.belongsTo(Message, { foreignKey: 'latestMessageId', as: 'latestMessage' })

module.exports = Chat;