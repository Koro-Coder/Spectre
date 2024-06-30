const { fetchContestDetails } = require("../API_CALLS/codeforces");
const { activatedBot } = require("../utils/replies");
const { sendToAllGroups } = require("./messageDistribution/groupRouting");

async function postContestUpdates(client){
    const contests = await fetchContestDetails();
    activeContests = contests
    .filter(contest => contest.phase === "BEFORE")
    .map(contest => `ID: ${contest.id} \nName: ${contest.name} \nStart Time: ${convertToIST(contest.startTimeSeconds)} \nDuration: ${contest.durationSeconds} seconds \n`).join('\n');
    sendToAllGroups(client, `📊 Upcoming Codeforces Contest Details \n\n ` + activeContests);
}

const convertToIST = (unixTimestamp) => {
    const date = new Date(unixTimestamp * 1000); // Convert to milliseconds
    const options = {
        timeZone: 'Asia/Kolkata',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    };
    return date.toLocaleString('en-IN', options);
};

module.exports = {postContestUpdates};