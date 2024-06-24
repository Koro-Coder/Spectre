function leetcodeProblemFormat(problem){
  return `
  
Title : ${problem.title}
Difficulty : ${problem.difficulty}

Go to problem : https://leetcode.com/problems/${problem.titleSlug}/description/
  `;
}

function codeforcesProblemFormat(problem){
  return `

Title : ${problem.name}
Rating : ${problem.rating}

Go to problem : https://codeforces.com/problemset/problem/${problem.contestId}/${problem.index}
  `;
}

function userInfoFormat(user){
  let leetcodeInfo = "", codeforcesInfo = "";

  if(user.leetcode.username)
  {
    leetcodeInfo = `
    💡 Leetcode 💡
Username: ${user.leetcode.username}
Total Problems Solved: ${user.leetcode.problems_solved.all}
Easy Problems Solved: ${user.leetcode.problems_solved.easy}
Medium Problems Solved: ${user.leetcode.problems_solved.medium}
Hard Problems Solved: ${user.leetcode.problems_solved.hard}
Global Ranking: ${user.leetcode.global_ranking}
Top Percentage: ${user.leetcode.top_percentage}
Current Badge: ${user.leetcode.badge}
    `;
  }

  if(user.codeforces.username)
  {
    const filteredProblems = user.codeforces.problems_solved.filter(problem => problem.count > 0);
    const problemsSolvedString = filteredProblems.map(problem => `[${problem.range}] : ${problem.count}`).join('\n');
    const totalProblemsSolved = filteredProblems.reduce((total, problem) => total + problem.count, 0);
    codeforcesInfo = `
    💡 Codeforces 💡
Username: ${user.codeforces.username}
Total Problems Solved: ${totalProblemsSolved}
Problems solved for rating ::
${problemsSolvedString}
Rank: ${user.codeforces.rank}
Rating: ${user.codeforces.rating}
    `
  }
  
  return leetcodeInfo + codeforcesInfo;
}

module.exports = {leetcodeProblemFormat, codeforcesProblemFormat, userInfoFormat}