const { updateGroupDetails } = require("./commands/userInfo");

async function addNewGroup(msg, client){
    const groupid = msg.from;
    const group = await client.getChatById(groupid);
    const participants = group.participants;
    await updateGroupDetails(groupid, participants);
    return "Spectre Bot Activated";
}

module.exports = {addNewGroup};