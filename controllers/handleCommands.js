const {addUserDetails, showUserDetails} = require('./commands/userInfo.js');

async function addLCProfile(phone_number, _, _, username){
    const user =  await addUserDetails(phone_number, {"leetcode_profile": username});
    if(user)
        return user;
    else
        return 'Error updating user details.';
}

async function addCFProfile(phone_number, _, _, username){
    const user = await addUserDetails(phone_number, {"codeforces_profile": username});
    if(user)
        return user;
    else
        return 'Error updating user details.';
}

async function showMyStats(phone_number, _, _, _){
    const user = await showUserDetails(phone_number);
    if(user)
        return user;
    else
        return 'No records found.';
}

async function showStats(_, _, phone_number, _){
    const user = await showUserDetails(phone_number);
    if(user)
        return user;
    else
        return 'No records found.';
}

substrFuncMap = {
    "/addlcprofile-": addLCProfile,
    "/addcfprofile-": addCFProfile,
    "/showmystats": showMyStats,
    "/showstats": showStats
};


async function handleCommands(phone_number, groupid, mentions, command){
    command = command.replace(/\s+/g, '').toLowerCase();
    msg = "Invalid Command.";
    for (const [substr, func] of Object.entries(substrFuncMap)) {
        if (command.startsWith(substr.toLowerCase())) {
          msg = await func(phone_number, groupid, mentions, command.slice(substr.length));
          break;
        }
    }
    return msg;
}

module.exports = {handleCommands};