// const {col} = require('sequelize')

// const sequelize = require('../db/database');
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


// exports.removeUserFromGroup = async (req, res) => {
//     try {
//         const adminId = req.user.id;
//         const { groupId, userId } = req.params;
//         console.log(groupId, userId, adminId);

//         const group = await Group.findOne({
//             where: {
//                 id: groupId,
//                 admin: adminId
//             }
//         })

//         if (!group) {
//             return res.status(403).send('Unauthorized , Only group admins can remove users')
//         }

//         const response = await GroupMembership.destroy({
//             where: {
//                 groupId: groupId,
//                 userId: userId
//             }
//         })
//         console.log(response);
//         if (response) {
//             res.status(200).send('Users removed from group')
//         }
//     } catch (error) {
//         res.status(500).send('Internal server error')
//     }
// }


// exports.makeUserAdmin = async (req, res) => {
//     try {
//         const { groupId, userId } = req.params;
//         const adminId = req.user.id;

//         const isAdmin = await GroupMembership.findOne({
//             where: {
//                 userId: adminId, groupId, isAdmin: true
//             }
//         })

//         if (!isAdmin) {
//             return res.status(403).send('Unauthorized: only group admins can make admin')
//         }

//         const response = await GroupMembership.update({ isAdmin: true }, {
//             where: {
//                 groupId, userId
//             }
//         })

//         if(response){

//             res.status(200).send('User promoted to admin')
//         }


//     } catch (error) {
//         res.status(500).send('Internal server error')
//     }
// }

// exports.addUserToGroup = async(req,res) =>{
//     try {
//         const adminId = req.user.id;
//         const {userId , groupId }= req.body;
//         const t = await sequelize.transaction()


//         const isAdmin = await GroupMembership.findOne({where:{
//             userId:adminId,groupId,isAdmin:true
//         }})

//         if(!isAdmin){
//             res.status(403).send('Unauthorized: only group admins can add user')
//         }

//         const users = await User.findAll({
//             where: {
//                 id: userId
//             }
//         })

//         const groupMembership = users.map(user => ({
//             groupId:groupId,
//             userId: user.id
//         }))


//         const response = await GroupMembership.bulkCreate(groupMembership, { transaction: t })

//         if (response) {
//             await t.commit()
//             res.status(201).send('Group created successfully')
//         }
//     } catch (error) {
//         await t.rollback()
//         res.status(500).send('Internal server error')
//     }
// }