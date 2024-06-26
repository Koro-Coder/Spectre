const { fetchLCDailyCodingChallenge } = require("../API_CALLS/leetcode");
const { leetcodeProblemFormat } = require("../utils/messageFormat");
const { sendToAllGroups } = require("./messageDistribution/groupRouting");

async function postDailyChallenge(client){
    const problem = await fetchLCDailyCodingChallenge();
    sendToAllGroups(client, `☀️ Today's Leetcode Daily Challenge \n ` + leetcodeProblemFormat(problem));
}

module.exports = {postDailyChallenge};