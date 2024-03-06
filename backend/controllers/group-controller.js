// const {col} = require('sequelize')

const Chat = require("../models/chat-model");
const User = require("../models/user-model");

const sequelize = require('../db/database');
// const GroupMembership = require('../models/group-membership');
// const Group = require('../models/group-model');
// const User = require('../models/user-model');

// exports.createGroup = async (req, res) => {
//     const { groupName, userId, adminId } = req.body;
//     const t = await sequelize.transaction();

//     try {
//         const group = await GroupMembership.findOne({
//             where:[{userId:userId},{userId:req.user.id}],
//             // include:[
//             //     {
//             //         model:User,
//             //         // as:'groupAdmin',
//             //         attributes:{exclude:['password']}
//             //     }
//             // ]
//         })

//         console.log(group);
//         if(group){
//             res.send(group)
//         }
//         else{
//         const createdGroup = await Group.create({ name: groupName, admin: adminId }, { transaction: t });

//         const users = await User.findAll({
//             where: {
//                 id: userId
//             }   
//         })

//         const groupMembership = users.map(user => ({
//             groupId: createdGroup.id,
//             userId: user.id
//         }))

//         groupMembership.push({ groupId: createdGroup.id, userId: adminId, isAdmin: true })

//         const response = await GroupMembership.bulkCreate(groupMembership, { transaction: t })

//         if (response) {
//             await t.commit()
//             res.status(201).send(createdGroup)
//         }
//     }
//     } catch (error) {
//         await t.rollback()
//         console.log(error);
//         res.status(500).send('Internal server error')
//     }

// }

// exports.getGroups = async (req, res) => {
//     const userId = req.user.id
//     try {
//         const user = await User.findByPk(userId, {
//             include: [
//                 {
//                     model: Group,
//                     through: GroupMembership
//                 }
//             ]
//         })
//         const groups = user ? user.groups : []
//         res.status(200).send(groups)
//     } catch (error) {
//         res.status(500).send(error)
//     }


// }


// exports.getGroupUsers = async (req, res) => {
//     try {
//         const { groupId } = req.params;

//         const users = await User.findAll({

//             include: [
//                 {
//                     model: Group,
//                     where: {
//                         id: groupId,
//                         // attribute:['isAdmin']
//                     },
//                     // attributes:[[col('groups.groupmemberships.isAdmin'),'isAdmin']],
//                     attributes:[]
//                     // through:{
//                     //     attributes:['isAdmin']
//                     // }
//                 },
//             ],
//             attributes: ['id', 'name', 'phone', 'email',[col('groups.groupmembership.isAdmin'),'isAdmin']]
//         })
//         if (!users || users.length === 0) {

//             return res.status(404).send('No users found')
//         }

//         res.status(200).send(users)

//     } catch (error) {
//         res.status(500).send(error)
//     }
// }


exports.removeUserFromGroup = async (req, res) => {
  try {
    const adminId = req.user.id;
    const { groupId, userId } = req.params;
    console.log(groupId, userId, adminId);

    // const group = await Group.findOne({
    //     where: {
    //         id: groupId,
    //         admin: adminId
    //     }
    // })

    // if (!group) {
    //     return res.status(403).send('Unauthorized , Only group admins can remove users')
    // }

    // const response = await GroupMembership.destroy({
    //     where: {
    //         groupId: groupId,
    //         userId: userId
    //     }
    // })
    // console.log(response);

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
    console.log(error);
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