const Message = require('../models/message-model');
const sequelize = require('../db/database');

const { Op } = require('sequelize');
const User = require('../models/user-model');
const Chat = require('../models/chat-model');
const Image = require('../models/image-model');

exports.sendMessage = async (req, res) => {
  const { message, image, chatId } = req.body;
  const userId = req.user.id;
  const t = await sequelize.transaction();
  let msg = null;
  try {
    if (!chatId) {
      return res.status(400).send("Invalid Data")
    }
    if (image) {
      const img = await Image.create({ imageData: image }, { transaction: t });
      msg = await Message.create({ content: message, userId, chatId, imageId: img.id }, { transaction: t })
      const newMsg = await Message.findOne({ where: { id: msg.id }, transaction: t, include: [{ model: Image }] })
      if (msg && img && newMsg) {
        await t.commit();
        return res.status(201).send(newMsg)
      }
      else {
        await t.rollback();
        res.status(400).send('Message cannot send')

      }
    }
    msg = await Message.create({ content: message, userId, chatId })

    const chat = await Chat.findByPk(chatId);
    chat.update({ latestMessageId: msg.id })




    if (msg) {
      await t.commit();
      res.status(201).send(msg)
    }
    else {
      await t.rollback();
      res.status(400).send('Message cannot send')
    }
  } catch (error) {
    await t.rollback();
    res.status(500).send('Internal server error')
  }
}


exports.getMessage = async (req, res) => {
  try {
    const { lastMsgId } = req.query;
    const { chatId } = req.params;

    // let messages;
    // let personalChats;
    // let groupChats;
    // if(lastMsgId){
    //     messages = await Message.findAll({ where: { id:{[Op.gt]:lastMsgId},userId: req.user.id } });
    // }
    // else{

    //     messages = await Message.findAll({ where: { userId: req.user.id } });
    // }

    // if(lastMsgId){

    // groupChats = await Group.findAll({
    //     include: [{
    //         model: Message,
    //         order: [['timeStamp', 'DESC']],
    //         // limit: 1, // Get the last message
    //         include: [{ model: User, as: 'sender' }]
    //     }]
    // });

    // personalChats = await User.findAll({
    //   include: [{
    //     model: Message,
    //     where: {
    //       senderId: req.user.id,
    //       isGroup: false
    //     },
    //     as: 'sentMessages',
    //     order: [['timeStamp', 'DESC']],
    //     include: [{
    //       model: User,
    //       as: 'receiver'
    //     }]
    //   }]
    // })
    // }
    // else{

    // }
    // messages = personalChats
    // messages = [...personalChats,...groupChats]

    // console.log(messages);
    const messages = await Message.findAll({
      where: {
        chatId: chatId
      },
      include: {
        model: Image,
      },
      order: [['timestamp', 'ASC']]
    })
    if (messages) {
      res.status(200).send(messages)
    }
    else {
      res.status(200).send('No messages')
    }
  } catch (error) {
    res.status(500).send('Internal server error')
  }
}


exports.accessChat = async (req, res) => {
  try {
    const { userId } = req.body;
    const reqUserId = req.user.id;
    if (!userId) {
      return res.status(400).send('user not found');
    }
    const allUsers = JSON.parse(userId)
    allUsers.push(reqUserId)
    let chat
    if (process.env.NODE_ENV === 'production') {
      chat = await Chat.findOne({
        where: {
          isGroup: false,
          users: {
            [Op.contains]: [userId], // Use Sequelize's Op.contains
          },
        },
      });
    }
    else {
      chat = await Chat.findOne({
        where: {
          isGroup: false,
          [Op.and]: allUsers.map(userId => sequelize.literal(`JSON_CONTAINS(users, '${userId}')`))
        },
      });
    }


    if (chat) {
      const users = await User.findAll({
        where: {
          id: chat.users,
        },
        attributes: { exclude: ['password'] }
      })

      chat.users = users
      res.send(chat);
    }
    else {
      const createdChat = await Chat.create({
        users: allUsers,
        isGroup: false,
      });

      const fullChat = await Chat.findOne({
        where: { id: createdChat.id },
      });

      const users = await User.findAll({
        where: {
          id: fullChat.users,
        },
        attributes: { exclude: ['password'] }
      })

      fullChat.users = users

      res.status(200).send(fullChat);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};


exports.fetchChats = async (req, res) => {
  try {
    const userId = req.user.id;

    let chats;
    if (process.env.NODE_ENV === 'production') {
      chats = await Chat.findAll({
        where: {
          users: {
            [Op.contains]: [userId],
          },
        },
        order: [['updatedAt', 'DESC']],
      });
    }

    else {

      chats = await Chat.findAll({
        where: {
          users: sequelize.literal(`JSON_CONTAINS(users, '${userId}')`)
        },
        order: [['updatedAt', 'DESC']]
      })
    }


    const populatedChats = await Promise.all(chats.map(async (chat) => {
      // Parse the users array
      const userIds = chat.users;
      // Fetch user details based on user IDs
      const users = await User.findAll({
        where: { id: userIds },
        attributes: { exclude: ['password'] }
      });
      const latestMessage = await Message.findByPk(chat.latestMessageId);
      // Assign the fetched users to the chat object
      chat.users = users;
      chat.latestMessageId = latestMessage
      return chat;
    }));

    res.status(200).send(populatedChats)
  } catch (error) {
    res.status(500).send(error)
  }
}