const { updateGroupDetails } = require("./commands/userInfo");

async function addNewGroup(msg, client){
    const groupid = "";
    const participants = "";
    await updateGroupDetails(groupid, participants);
    return "Spectre Bot Activated";
}

async function addNewParticipant(msg, client){
    const groupid = "";
    const participant = "";
    const user = "";
    await updateGroupDetails(groupid, [participant]);
    return `Welcome ${user}`;
}

module.exports = {addNewGroup, addNewParticipant};