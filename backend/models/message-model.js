const Sequelize = require('sequelize');

const db = require('../db/database');
const User = require('./user-model');
// const Group = require('./group-model');
const Chat = require('./chat-model');


const Message = db.define('message', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    timeStamp: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false
    },
    chatId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // references: {
        //     model: 'chats',
        //     key: 'id'
        // }
    }
});

User.hasMany(Message);
Message.belongsTo(User);

// Message.assoiciate = (models) => {
// Message.belongsTo(Chat)
// }

// Chat.hasOne(Message, { foreignKey: 'chatId' }); // One Chat can have one latest message
// Message.belongsTo(Chat, { foreignKey: 'chatId' });

// User.hasMany(Message,{as:'sender',foreignKey:'senderId'});
// Message.belongsTo(User,{as:'receiver',foreignKey:'receiverId'});


module.exports = Message