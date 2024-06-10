const User = require('../models/User.js')
const {fetchProblemDetails, fetchUserProfileInfo} = require('../API_CALLS/leetcode.js')

async function handleLatestUpdates(){
    const users = await User.find({ });
    for (const user of users) {
        //leetcode Checks
        if(user.leetcode.username)
        {
            //console.log(user.leetcode.username);
            const currentUser = await fetchUserProfileInfo(user.leetcode.username);
            //console.log("current user : ", user)
            // perform updates on user instance
            if(currentUser.matchedUser)
            {
                user.leetcode.problems_solved = {
                    all: currentUser.matchedUser.submitStats.acSubmissionNum[0].count,
                    easy: currentUser.matchedUser.submitStats.acSubmissionNum[1].count,
                    medium: currentUser.matchedUser.submitStats.acSubmissionNum[2].count,
                    hard: currentUser.matchedUser.submitStats.acSubmissionNum[3].count,
                };
                user.leetcode.global_ranking = currentUser.userContestRanking.globalRanking;
                user.leetcode.top_percentage = currentUser.userContestRanking.topPercentage;
                user.leetcode.badge = currentUser.userContestRanking.badge.name;

                //check for new submissions
                user.last_checked = 0;
                last_checked = user.last_checked;
                last_title = "";
                currentUser.recentAcSubmissionList.reverse();

                for(const problem of currentUser.recentAcSubmissionList)
                {
                    if(problem.title!=last_title && problem.timestamp>last_checked)
                    {
                        console.log('solved new problem');
                        // send back message 
                        const problemDetails = await fetchProblemDetails(problem.titleSlug);
                        console.log(problemDetails);
                    }
                    last_checked = Math.max(problem.timestamp, last_checked);
                    last_title = problem.title;
                }
                user.last_checked = last_checked;
            }
        }
        
      await user.save();
    }

    const all = await User.find({ });
    console.log(all);
}

module.exports = {handleLatestUpdates};
