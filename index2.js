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
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.initialize();

mongoose.connect(process.env.DB_STRING).then(async() => {
    client.on('message', async (msg) => {
        //console.log("msg - ",msg);
        //const mentions = await msg.getMentions();
        //console.log("mentions - ", mentions);
        if(msg.body[0] == '/' && checkGroup(msg.from))
        {
            const sender = await msg.getContact();
            const reply = await handleCommands(sender.number, msg.from, msg.mentionedIds, msg.body);
            sendToOneGroup(msg, reply);
        }
        if(msg.body.replace(/\s+/g, "").toLowerCase() == '-activatespectrebot')
        {
            await addNewGroup(msg, client);
            client.sendMessage(msg.from,'🤖 Spectre Bot is active now.');
        }
    });
});