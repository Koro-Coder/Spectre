function leetcodeDataHandler(updatedUser) {
  const leetcode = {
    username: updatedUser.matchedUser.username,
    problems_solved: {
      all: updatedUser.matchedUser.submitStats.acSubmissionNum[0].count,
      easy: updatedUser.matchedUser.submitStats.acSubmissionNum[1].count,
      medium: updatedUser.matchedUser.submitStats.acSubmissionNum[2].count,
      hard: updatedUser.matchedUser.submitStats.acSubmissionNum[3].count,
    },
    global_ranking: updatedUser.userContestRanking.globalRanking,
    top_percentage: updatedUser.userContestRanking.topPercentage,
    badge: updatedUser.userContestRanking.badge.name,
  };
  return leetcode;
}

module.exports = {leetcodeDataHandler};