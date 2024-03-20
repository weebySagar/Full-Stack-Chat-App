// const {col} = require('sequelize')

const Chat = require("../models/chat-model");
const User = require("../models/user-model");

const sequelize = require('../db/database');


exports.removeUserFromGroup = async (req, res) => {
  try {
    const adminId = req.user.id;
    const { groupId, userId } = req.params;

    const chat = await Chat.findOne({
      where: {
        id: groupId,
        groupAdminId: sequelize.literal(`JSON_CONTAINS(groupAdminId, '${adminId}')`)
      }
    })

    if (!chat) {
      return res.status(403).send('Unauthorized: only group admins can remove user')
    }

    chat.users = chat.users.filter(id => id !== +userId);
    await chat.save();

    const users = await User.findAll({ where: { id: chat.users } })
    if (users) {
      res.status(200).send(users)
    }
  } catch (error) {
    res.status(500).send('Internal server error')
  }
}


exports.makeUserAdmin = async (req, res) => {
  try {
    const { groupId, userId } = req.params;
    const adminId = req.user.id;

    const chat = await Chat.findOne({
      where: {
        id: groupId,
        groupAdminId: sequelize.literal(`JSON_CONTAINS(groupAdminId, '${adminId}')`)
      }
    })

    if (!chat) {
      return res.status(403).send('Unauthorized: only group admins can promote user')
    }

    chat.groupAdminId = [...new Set([...chat.groupAdminId, +userId])];
    const response = await chat.save()

    if (response) {
      res.status(200).send(response.groupAdminId)
    }
  } catch (error) {
    res.status(500).send('Internal server error')
  }
}

exports.addUserToGroup = async (req, res) => {
  const t = await sequelize.transaction()
  try {
    const adminId = req.user.id;
    const { userId, groupId } = req.body;

    const chat = await Chat.findOne({
      where: {
        id: groupId,
        groupAdminId: sequelize.literal(`JSON_CONTAINS(groupAdminId, '${adminId}')`)
      }
    })


    if (!chat) {
      return res.status(403).send('Unauthorized: only group admins can add user')
    }


    chat.users = [...new Set([...chat.users, ...userId])];
    const response = await chat.save()

    const users = await User.findAll({ where: { id: chat.users } })

    if (response && users) {
      await t.commit()
      res.status(201).send(users)
    }
  } catch (error) {
    await t.rollback()
    res.status(500).send('Internal server error')
  }
}

exports.createGroupChat = async (req, res) => {
  const { chatName, userId } = req.body;

  try {
    if (!chatName || !userId) {
      return res.status(400).send('Enter all fields');
    }

    const allUsers = JSON.parse(userId);

    allUsers.push(req.user.id)

    const groupChat = await Chat.create({
      chatName,
      users: allUsers,
      isGroup: true,
      groupAdminId: [req.user.id],
    })

    const users = await User.findAll({ where: { id: groupChat.users } });
    groupChat.users = users
    res.status(200).send(groupChat)
  } catch (error) {
    res.status(500).send('Internal server error')
  }
}

exports.updateGroup = async (req, res) => {
  try {
    const { chatName, imgUrl, chatId } = req.body;

    const chat = await Chat.findByPk(chatId);
    if (!imgUrl) {

      chat.update({ chatName })
    }
    else {
      chat.update({ chatName, imageUrl: imgUrl })
    }

    const updatedChat = await chat.save();
    res.status(201).send(updatedChat);
  } catch (error) {
    res.status(500).send('Internal server error')
  }
}