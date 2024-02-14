const db = require("../db/database");
const User = require('./user-model');
const Group = require('./group-model');

const GroupMembership = db.define('groupmembership',{});


User.belongsToMany(Group,{through: GroupMembership});
Group.belongsToMany(User,{through: GroupMembership});

module.exports = GroupMembership

