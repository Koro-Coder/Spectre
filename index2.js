const { Client, RemoteAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { MongoStore } = require('wwebjs-mongo');
const mongoose = require('mongoose');
const {handleCommands} = require('./controllers/handleCommands.js')
const {handleLatestUpdates} = require('./controllers/handlelLatestUpdates.js');
const {run} = require('./controllers/commands/groupInfo.js');
const { checkGroup } = require('./controllers/checks/checkGroup.js');
const { sendToOneGroup } = require('./controllers/messageDistribution/groupRouting.js');
const { addNewGroup } = require('./controllers/updateGroupParticipants.js');
const { onGroupJoin, addedMembers, activatedBot } = require('./utils/replies.js');

require('dotenv').config();

///////////////////////////////

const client = new Client({
    webVersionCache: {
        type: "remote",
        remotePath:
          "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html",
      }});

client.on('ready', () => {
    console.log('Client is ready!');
    handleLatestUpdates(client);
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.initialize();

mongoose.connect(process.env.DB_STRING).then(async() => {
    client.on('message', async (msg) => {
        console.log(msg.body);
        if(msg.body[0] == '/' && checkGroup(msg.from))
        {
            const reply = await handleCommands(msg.author.slice(0, -5), msg.from, msg.mentionedIds, msg.body);
            sendToOneGroup(msg, reply);
        }
        else if(msg.body.replace(/\s+/g, "").toLowerCase() == '-activatespectrebot')
        {
            await addNewGroup(msg, client);
            sendToOneGroup(msg, activatedBot);
        }
        else if(msg.body.replace(/\s+/g, "").toLowerCase() == '-addnewmembers' && checkGroup(msg.from))
        {
            await addNewGroup(msg, client);
            sendToOneGroup(msg, addedMembers);
        }
    });
    client.on('group_join', async(notification)=>{
        client.sendMessage(notification.chatId, onGroupJoin);
    })
});

// async function run(client)
// {
//     while(true)
//     {
//         await handleLatestUpdates(client);
//     }
// }