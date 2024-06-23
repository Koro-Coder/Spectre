const Group = require("../../models/Group");
const User = require("../../models/User");

async function sendToOneGroup(msg, reply){
    msg.reply(reply);
}

async function sendToUserGroups(client, phone_number, reply){
    const user = await User.findOne({phone_number: phone_number});
    for(const group of user.groups)
    {
        client.sendMessage(group, reply);
    }
}

async function sendToAllGroups(client, reply){
    const groups = await Group.find({});
    for(const group of groups)
    {
        client.sendMessage(group.group_id, reply);
    }
}

module.exports = {sendToOneGroup, sendToUserGroups, sendToAllGroups};