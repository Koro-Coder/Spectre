const Group = require("../../models/Group");

async function checkGroup(groupid){
    return await Group.findOne({group_id: groupid});
}

module.exports = {checkGroup};