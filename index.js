const { Client, RemoteAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { MongoStore } = require('wwebjs-mongo');
const mongoose = require('mongoose');
const {handleCommands} = require('./controllers/handleCommands.js')
const {handleLatestUpdates} = require('./controllers/handlelLatestUpdates.js');
const {run} = require('./controllers/commands/groupInfo.js')

require('dotenv').config()

mongoose.connect(process.env.DB_STRING).then(async() => {
    const msg = await handleCommands("1234567", "groupid", "1234567", "/showstats - teoaniac");
    console.log(msg);
    //handleLatestUpdates();
});


/*
mongoose.connect(process.env.DB_STRING).then(() => {
    console.log("Connected to server");
    const store = new MongoStore({ mongoose: mongoose });
    const client = new Client({
        webVersionCache: {
            type: "remote",
            remotePath:
              "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html",
          },
        authStrategy: new RemoteAuth({
            store: store,
            backupSyncIntervalMs: 300000
        })
    });
    client.once('qr', (qr) => {
        qrcode.generate(qr, {small: true});
    });
    
    client.once('ready', () => {
        console.log('Client is ready!');
    });

    client.on('remote_session_saved', () => {
        console.log('Session Saved');
    });

    client.on('group_join', async(notification)=>{
        console.log('Group Joined :: ',notification);
        const participantId = notification.recipientIds[0];
        const participant = await client.getContactById(participantId);
        console.log(participant);
    })
    
    client.on('message', async (msg) => {
    
        //const c1 = await msg.getContact();
        //console.log('getContact - ', c1);
    
        //const c2 = msg.from;
        //console.log('from  - ', c2);
    
        console.log('message - ', msg.body);
        run(msg);
    
        if (msg.body == '!ping') {
            client.sendMessage(msg.from,'pong');
        }
    });

    client.initialize();
});
*/