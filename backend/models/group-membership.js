// const db = require("../db/database");
// const User = require('./user-model');
// const Group = require('./group-model');
// const Sequelize = require("sequelize");
// // const Chat = require("./chat-model");

// const GroupMembership = db.define('groupmembership',{
//     id:{
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         primaryKey:true,
//         allowNull: false
//     },
//     isAdmin:{
//         type:Sequelize.BOOLEAN,
//         defaultValue:false,
//         allowNull: true
//     }
// });


// User.belongsToMany(Group,{through: GroupMembership});
// Group.belongsToMany(User,{through: GroupMembership});

// module.exports = GroupMembership

