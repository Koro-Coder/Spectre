const { fetchCFUserProfileInfo, fetchCFUserProblemCount } = require("../API_CALLS/codeforces.js");
const { fetchLCUserProfileInfo } = require("../API_CALLS/leetcode.js");
const { leetcodeDataHandler } = require("../utils/leetcodeUtils.js");
const { codeforcesDataHandler } = require("../utils/codeforcesUtils.js");
const { addUserDetails, showUserDetails } = require("./commands/userInfo.js");

async function addLCProfile(phone_number, _, _, username) {
  const LCinfo = await fetchLCUserProfileInfo(username);
  if (LCinfo.matchedUser) 
  {
    const leetcode = leetcodeDataHandler(LCinfo);
    const user = await addUserDetails(phone_number, {
      leetcode: leetcode,
      last_checked: Math.floor(Date.now() / 1000),
    });
    return "User information updated";
  }
  else  return "Invalid username";
}

async function addCFProfile(phone_number, _, _, username) {
  const CFinfo = await fetchCFUserProfileInfo(username);
  if (CFinfo) 
  {
    const codeforces = codeforcesDataHandler(CFinfo);
    codeforces.problems_solved = await fetchCFUserProblemCount(username);
    const user = await addUserDetails(phone_number, {
      codeforces: codeforces,
      last_checked: Math.floor(Date.now() / 1000),
    });
    return "User information updated";
  }
  else  return "Invalid username";
}

async function showMyStats(phone_number, _, _, _) {
  const user = await showUserDetails(phone_number);
  if (user) return user;
  else return "No records found.";
}

async function showStats(_, _, phone_number, _) {
  const user = await showUserDetails(phone_number);
  if (user) return user;
  else return "No records found.";
}

substrFuncMap = {
  "/addlcprofile-": addLCProfile,
  "/addcfprofile-": addCFProfile,
  "/showmystats": showMyStats,
  "/showstats": showStats,
};

async function handleCommands(phone_number, groupid, mentions, command) {
  command = command.replace(/\s+/g, "").toLowerCase();
  msg = "Invalid Command.";
  for (const [substr, func] of Object.entries(substrFuncMap)) {
    if (command.startsWith(substr.toLowerCase())) {
      msg = await func(
        phone_number,
        groupid,
        mentions,
        command.slice(substr.length)
      );
      break;
    }
  }
  return msg;
}

module.exports = { handleCommands };
