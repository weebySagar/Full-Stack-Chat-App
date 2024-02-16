const sequelize = require('../db/database');
const GroupMembership = require('../models/group-membership');
const Group = require('../models/group-model');
const User = require('../models/user-model');

exports.createGroup =async (req,res) =>{
    const {groupName,userId} = req.body; 
    const t =await sequelize.transaction();

    try {
        const group = await Group.create({name:groupName},{transaction:t});

        const users = await User.findAll({
            where:{
                id:userId
            }
        })

        const groupMembership = users.map(user=>({
            groupId: group.id,
            userId: user.id
        }))

       const response =  await GroupMembership.bulkCreate(groupMembership,{transaction:t})

       if(response){
            await t.commit()
           res.status(201).send('Group created successfully')
       }

    } catch (error) {
        await t.rollback()
        res.status(500).send('Internal server error')
    }

}