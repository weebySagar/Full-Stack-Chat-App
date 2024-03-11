const Sequelize = require('sequelize');

const db = require('../db/database');
const Message = require('./message-model');

const Image = db.define('image', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,

    },
    imageData: {
        type: Sequelize.BLOB('long')
    }
});


Message.belongsTo(Image)

module.exports = Image;