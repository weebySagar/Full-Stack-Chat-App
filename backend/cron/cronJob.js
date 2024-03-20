const cron = require('cron');
const Sequelize = require('sequelize')

const Message = require("../models/message-model");
const ArchivedChat = require('../models/archive-message-model');

const job = new cron.CronJob('0 0 * * *', async () => {
    try {
        const twentyFourHoursAgo = new Date(Date.now() - (1 * 60 * 1000));
        const dataToMove = await Message.findAll({
            where: {
                createdAt: {
                    [Sequelize.Op.lt]: twentyFourHoursAgo
                }
            }
        });

        await ArchivedChat.bulkCreate(dataToMove.map(message => ({ ...message.toJSON() })));
        await Message.destroy({
            where: {
                id: dataToMove.map(({ id }) => id)
            }
        })

    } catch (error) {
        console.log(error);
    }
}, null, true, 'UTC');

module.exports = job;