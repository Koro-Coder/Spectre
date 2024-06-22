const User = require("../models/User.js");
const { fetchLCProblemDetails, fetchLCUserProfileInfo } = require("../API_CALLS/leetcode.js");
const { leetcodeDataHandler } = require("../utils/leetcodeUtils.js");
const { fetchCFUserProfileInfo, fetchCFUserSubmissionHistory } = require("../API_CALLS/codeforces.js");
const { codeforcesDataHandler } = require("../utils/codeforcesUtils.js");
const { codeforcesProblemFormat, leetcodeProblemFormat } = require("../utils/messageFormat.js");

async function handleLatestUpdates() {
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
            console.log("solved new problem in LC");
            // send back message
            const problemDetails = await fetchLCProblemDetails( problem.titleSlug );
            console.log(leetcodeProblemFormat(problemDetails));
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
            console.log("Solved new Problem in CF", codeforcesProblemFormat(submission.problem));
            user.codeforces.problems_solved[Math.floor((submission.problem.rating - 1) / 500)].count += 1;
          }
          last_checked = Math.max(last_checked, submission.creationTimeSeconds);
        }
      }
    }
    user.last_checked = last_checked;
    await user.save();
  }

  const all = await User.find({});
  console.log(all);
}

module.exports = { handleLatestUpdates };