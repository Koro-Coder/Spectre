const { add } = require("nodemon/lib/rules");

const onGroupJoin = `
You can use following commands ::


-Activate Spectre Bot

-Add new members

/Add LC Profile - [Leetcode handle]

/Add CF Profile - [Codeforces handle]

/Show my stats

/Show stats
`;

const activatedBot = `🤖 Spectre Bot is active now.`;

const addedMembers = `New members added.`;

module.exports = {onGroupJoin, activatedBot, addedMembers};