const qrcode = require('qrcode-terminal');
const { Client, LocalAuth, GroupChat} = require('whatsapp-web.js');


const client = new Client({
    webVersionCache: {
      type: "remote",
      remotePath:
        "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html",
    },
    authStrategy: new LocalAuth()
  });
client.once('qr', (qr) => {
    // Generate and scan this code with your phone
    qrcode.generate(qr, {small: true});
});

client.once('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async (msg) => {
    //console.log('getContact - ',msg.getContact());
    //console.log('from - ', msg.from);

    const c1 = await msg.getContact();
    console.log('getContact - ', c1);

    const c2 = msg.from;
    console.log('from  - ', c2);

    console.log('message - ', msg.body);
    console.log();
    console.log();
    console.log();

    if (msg.body == '!ping') {
        client.sendMessage(msg.from,'pong');
    }

    if(msg.from.includes('g.us'))
    {
        const gr = new GroupChat(client, msg.from);
        console.log(gr);
    }
});

client.initialize();