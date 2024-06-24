const User = require("../models/User.js");
const { fetchLCProblemDetails, fetchLCUserProfileInfo } = require("../API_CALLS/leetcode.js");
const { leetcodeDataHandler } = require("../utils/leetcodeUtils.js");
const { fetchCFUserProfileInfo, fetchCFUserSubmissionHistory } = require("../API_CALLS/codeforces.js");
const { codeforcesDataHandler } = require("../utils/codeforcesUtils.js");
const { codeforcesProblemFormat, leetcodeProblemFormat } = require("../utils/messageFormat.js");
const { sendToUserGroups } = require("./messageDistribution/groupRouting.js");

async function handleLatestUpdates(client) {
  const users = await User.find({});
  for (const user of users) {
    last_checked = user.last_checked;
    //leetcode Checks
    if (user.leetcode.username) {
      const updatedUser = await fetchLCUserProfileInfo(user.leetcode.username);
      if (updatedUser.matchedUser) {
        user.leetcode = leetcodeDataHandler(updatedUser);
        last_title = "";
        updatedUser.recentAcSubmissionList.reverse();
        for (const problem of updatedUser.recentAcSubmissionList) {
          if ( problem.title != last_title && problem.timestamp > user.last_checked) {
            // send back message
            const str = `${user.phone_number} solved new problem on Leetcode \n`;
            const problemDetails = await fetchLCProblemDetails( problem.titleSlug );
            sendToUserGroups(client, user.phone_number, str + leetcodeProblemFormat(problemDetails));
          }
          last_checked = Math.max(problem.timestamp, last_checked);
          last_title = problem.title;
        }
      }
    }
    // Codeforces Checks
    if (user.codeforces.username) {
      const CFuser = await fetchCFUserProfileInfo(user.codeforces.username);
      if (CFuser) {
        const codeforces = codeforcesDataHandler(CFuser);
        const submissions = await fetchCFUserSubmissionHistory( user.codeforces.username );
        for (const submission of submissions) {
          if ( user.last_checked < submission.creationTimeSeconds && submission.verdict == "OK") {
            const str = `${user.phone_number} solved new problem on Codeforces \n`;
            sendToUserGroups(client, user.phone_number, str + codeforcesProblemFormat(submission.problem));
            user.codeforces.problems_solved[Math.floor((submission.problem.rating - 1) / 500)].count += 1;
          }
          last_checked = Math.max(last_checked, submission.creationTimeSeconds);
        }
      }
    }
    user.last_checked = last_checked;
    await user.save();
  }

  // const all = await User.find({});
  // console.log(all);
}

module.exports = { handleLatestUpdates };