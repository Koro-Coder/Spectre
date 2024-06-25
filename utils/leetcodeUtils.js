function leetcodeDataHandler(updatedUser) {
  const leetcode = {
    username: updatedUser?.matchedUser?.username ?? '',
    problems_solved: {
      all: updatedUser?.matchedUser?.submitStats?.acSubmissionNum?.[0]?.count ?? 0,
      easy: updatedUser?.matchedUser?.submitStats?.acSubmissionNum?.[1]?.count ?? 0,
      medium: updatedUser?.matchedUser?.submitStats?.acSubmissionNum?.[2]?.count ?? 0,
      hard: updatedUser?.matchedUser?.submitStats?.acSubmissionNum?.[3]?.count ?? 0,
    },
    global_ranking: updatedUser?.userContestRanking?.globalRanking ?? 0,
    top_percentage: updatedUser?.userContestRanking?.topPercentage ?? 0,
    badge: updatedUser?.userContestRanking?.badge?.name ?? 'No Badge',
  };
  return leetcode;
}

module.exports = { leetcodeDataHandler };
