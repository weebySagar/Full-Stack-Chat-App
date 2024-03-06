const Message = require('../models/message-model');
const sequelize = require('../db/database');

const { Op, Sequelize, col, cast } = require('sequelize');
const User = require('../models/user-model');
const Group = require('../models/group-model');
const GroupMembership = require('../models/group-membership');
const Chat = require('../models/chat-model');

exports.sendMessage = async (req, res) => {
  const { message, chatId, } = req.body;
  const userId = req.user.id;
  const t = await sequelize.transaction();

  try {
    if (!message || !chatId) {
      return res.status(400).send("Invalid Data")
    }

    const msg = await Message.create({ content: message, userId, chatId })

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


// exports.getAllChats = async (req, res) => {
//     try {
//         const userId = req.user.id;
//         // Fetch group chats where the user is a member
//         //  const groupChats = await Group.findAll({
//         //     include: [{
//         //         model: Message,
//         //         include: [{ model: User, as: 'sender' }]
//         //     }],
//         //     where: {
//         //         '$messages.senderId$': userId // Include group chats where the user sent a message
//         //     }
//         // });

//         // Fetch personal chats where the user sent or received a message
//         // const personalChats = await User.findAll({
//         //     include: [{
//         //         model: Message,
//         //         as: 'sentMessages',
//         //         include: [{ model: User, as: 'receiver' }]
//         //     }, {
//         //         model: Message,
//         //         as: 'receivedMessages',
//         //         include: [{ model: User, as: 'sender' }]
//         //     }],
//         //     where: {
//         //         '$sentMessages.senderId$': userId, // Include personal chats where the user sent a message
//         //         '$receivedMessages.receiverId$': userId // Include personal chats where the user received a message
//         //     }
//         // });

//         // const user = await User.findAll({
//         //     // group:[['id']],
//         //     include:[{
//         //         model:Message,
//         //         order:[['timeStamp','DESC']],
//         //         where:{
//         //             [Op.or]:[{senderId:req.user.id},{receiverId:req.user.id}],
//         //             isGroup:false
//         //         }
//         //     }]
//         // })

//         const groupChats = await Group.findAll({
//             include: [
//                 {
//                     model: Message,
//                     as: 'messages',
//                     order: [['timeStamp', 'DESC']],
//                     limit: 1,
//                     include: [
//                         {
//                             model: User,
//                             where: { id: userId }
//                         }
//                     ]
//                 },
//             ],

//         });

//         // Fetch one-on-one chats
//         //   const oneOneChats = await Message.findAll({
//         //     where: {
//         //       [Op.or]: { senderId: userId ,  receiverId: userId },
//         //       isGroup:false
//         //     },
//         //     include:[
//         //         {
//         //             model:User,
//         //             // where:{
//         //             //     [Op.ne]
//         //             // }
//         //         }
//         //     ]
//         //     // include: [
//         //     //   {
//         //     //     model: User,
//         //     //     // as: 'otherUser',
//         //     //     where: {
//         //     //       id: {
//         //     //         [Op.ne]: userId, // Exclude the current user from "otherUser"
//         //     //       },
//         //     //     },
//         //     //   },
//         //     // ],
//         //     // order: [['createdAt', 'DESC']],
//         //     // group: ['otherUserId'], // Combine messages based on recipient ID
//         //   });

//         // const oneOneChats = await User.findAll({

//         //     include:[{
//         //         model:Message,
//         //         where:{
//         //             [Op.or]: { senderId: userId ,  receiverId: userId }
//         //         },
//         //         attributes:[]
//         //     }]
//         // })

//         const oneOneChats = await Message.findAll({
//             where: {
//                 [Op.or]: { senderId: userId, receiverId: userId },
//                 isGroup: false
//             },
//             include: [{
//                 model: User,
//                 as:'sentMessages',
//                 attributes: ['id','name', 'email'],

//             },
//             {
//                 model: User,
//                 as:'receiver',
//                 attributes: ['id','name', 'email'],

//             }
//             ],
//         })


//         console.log(oneOneChats);
//         // Combine group and personal chats
//         const allChats = [...groupChats, ...oneOneChats];

//         return res.status(200).json(allChats);
//     } catch (error) {
//         console.error('Error fetching all chats:', error);
//         return res.status(500).json({ message: 'Internal server error' });
//     }
// }

exports.accessChat = async (req, res) => {
  try {
    const { userId } = req.body;
    const reqUserId = req.user.id;
    if (!userId) {
      console.log("UserId param not sent with request");
      return res.sendStatus(400);
    }
    const allUsers = JSON.parse(userId)
    allUsers.push(reqUserId)
    const chat = await Chat.findOne({
      where: {
        isGroup: false,
        [Op.and]: allUsers.map(userId => sequelize.literal(`JSON_CONTAINS(users, '${userId}')`))


      },
      // where: sequelize.where(
      //   sequelize.fn('JSON_CONTAINS', sequelize.col('users'), JSON.stringify(allUsers)),
      //   true
      // )

      // include: [
      // {
      //   model: User,
      //   as: 'groupAdmin',
      //   attributes:['name','email']
      //   // where: { id: [req.user.id ,userId]}
      // },
      //   {
      //     model: User,
      //     as: 'users',
      //     where: { id: userId }
      //   },
      // {
      //   model: Message,
      //   as: 'latestMessage'
      // }
      // ]
    });

    // const chat = await Chat.findAll()

    // console.log(chat);

    if (chat) {
      // console.log(JSON.parse(chat.users));
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

      // await createdChat.addUsers([req.user.id],[userId]);
      // await createdChat.addUser(userId);

      const fullChat = await Chat.findOne({
        where: { id: createdChat.id },
        // include: [
        //   {
        //     model: User,
        //     as: 'groupAdmin',
        //   },
        //   {
        //     model: Message,
        //     as: 'latestMessage'
        //   }
        // ]
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
    console.error(error);
    res.status(400).send(error.message);
  }
};


exports.fetchChats = async (req, res) => {
  try {
    const userId = req.user.id;
    const chats = await Chat.findAll({

      // where:{
      //   users:{
      //     [Sequelize.Op.like]: `%[${userId},%`, // User ID at the beginning of the array
      //     [Sequelize.Op.like]: `%${userId}%`,
      //   }
      // },
      where: {
        users: sequelize.literal(`JSON_CONTAINS(users, '${userId}')`)
      },

      // include:[
      //   {
      //     model:User,
      //     as:'groupAdmin',
      //   }
      // ],
      order: [['updatedAt', 'DESC']]
    })


    // Populate latestMessage.sender with specific attributes
    // Populate users array with specific attributes
    const populatedChats = await Promise.all(chats.map(async (chat) => {
      // Parse the users array
      const userIds = chat.users;
      // Fetch user details based on user IDs
      const users = await User.findAll({
        where: { id: userIds },
        attributes: { exclude: ['password'] }
      });
      // Assign the fetched users to the chat object
      chat.users = users;
      return chat;
    }));


    res.status(200).send(populatedChats)
  } catch (error) {
    res.status(500).send(error)
  }
}