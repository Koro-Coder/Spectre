const { Client, RemoteAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode');
const schedule = require('node-schedule');
const nodemailer = require('nodemailer');
const { MongoStore } = require('wwebjs-mongo');
const mongoose = require('mongoose');
const {handleCommands} = require('./controllers/handleCommands.js')
const {handleLatestUpdates} = require('./controllers/handlelLatestUpdates.js');
const { checkGroup } = require('./controllers/checks/checkGroup.js');
const { sendToOneGroup } = require('./controllers/messageDistribution/groupRouting.js');
const { addNewGroup } = require('./controllers/updateGroupParticipants.js');
const { onGroupJoin, addedMembers, activatedBot } = require('./utils/replies.js');
const { postDailyChallenge } = require('./controllers/postDailyChallenge.js');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD 
    }
});

const client = new Client({
    webVersionCache: {
        type: "remote",
        remotePath:
          "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html",
    }});

client.once('ready', async() => {
    console.log('Client is ready!');
    schedule.scheduleJob('0 9 * * *', async () => {
        await postDailyChallenge(client);
    });
    while(true){
        await handleLatestUpdates(client);
    }
});

client.once('qr', qr => {
    qrcode.toDataURL(qr, (err, url) => {
        if (err) {
            console.error('Error generating QR code:', err);
            return;
        }
        const mailOptions = {
            from: {
                name: 'Spectre',
                address: process.env.EMAIL
            },
            to: process.env.EMAIL,
            subject: 'WhatsApp QR Code',
            text: 'Copy this URL in browser and scan QR code to log into Whatsapp Web \n\n' + url

        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });
    });
});

client.initialize();

mongoose.connect(process.env.DB_STRING).then(async() => {
    client.on('message', async (msg) => {
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
