const { Client, RemoteAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { MongoStore } = require('wwebjs-mongo');
const mongoose = require('mongoose');
require('dotenv').config()

mongoose.connect(process.env.DB_STRING).then(() => {
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
    
    
    client.on('message', async (msg) => {
    
        const c1 = await msg.getContact();
        console.log('getContact - ', c1);
    
        const c2 = msg.from;
        console.log('from  - ', c2);
    
        console.log('message - ', msg.body);
    
        if (msg.body == '!ping') {
            client.sendMessage(msg.from,'pong');
        }
    });
    
    client.initialize();    
});