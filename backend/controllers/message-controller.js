const Message = require('../models/message-model');
const sequelize = require('../db/database');

exports.sendMessage = async (req,res) =>{
    const {msg} =  req.body;
    const userId = req.user.id;
    const t = await sequelize.transaction();

    try {
        const response = await Message.create({content:msg,userId},{transaction:t})

        if(response){
            await t.commit();
            res.status(201).send('Message sent successfully')
        }
        else{
            await t.rollback();
            res.status(400).send('Message cannot send')
        }
    } catch (error) {
        await t.rollback();
        res.status(500).send('Internal server error')
    }
}