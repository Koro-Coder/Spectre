const { fetchLCDailyCodingChallenge } = require("../API_CALLS/leetcode");
const { leetcodeProblemFormat } = require("../utils/leetcodeUtils");

async function postDailyChallenge(client){
    const problem = await fetchLCDailyCodingChallenge();
    console.log(leetcodeProblemFormat(problem));
    // send to all groups using client
}

module.exports = {postDailyChallenge};

postDailyChallenge();