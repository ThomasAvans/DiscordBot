require ("dotenv").config();
const TOKEN = process.env.TOKEN;

const Discord = require('discord.js');
const {prefix} = require('./config.json');
const ms = require("ms");
const client = new Discord.Client();

const info = new Discord.MessageEmbed()
	.setColor('#8c00ff') 
	.setTitle('Vaati 2.0')
	.setURL('https://discordapp.com/api/oauth2/authorize?client_id=685555717788139580&permissions=485747878&scope=bot')
    .setDescription('Moderator-type bot.')
	.setThumbnail('https://i.imgur.com/Xrim5dC.jpg')
	.addFields(
        { name: 'Miscellaneous Commands', value: '!info\n !version\n !ping\n Can be used by anyone in the server.', inline: false },
		{ name: 'Chat Moderator Commands', value: '!purge\n Can only be used by members with manage nickname and manage messages permissions.', inline: false },
		{ name: 'Server Moderator Commands', value: '!kick\n !ban\n Can only be used by members with kick, ban and admin permissions.', inline: false },
	)   //way of making multiple boxes in which you can write information
	.setTimestamp() //Will automatically adjust the timezone depending on the user's device
	.setFooter('Created for fun');

var Version = '0.1';

client.once('ready', () => {
    console.log('The bot is online!')
})

//more about messages at: https://discord.js.org/#/docs/main/stable/class/Message

client.on('message', message => {

    let args = message.content.substring(prefix.length).split(" ");

    //member commands
    switch(args[0]){
        case 'ping':
            message.channel.send('pong!')
            break;
        case 'website':
            message.channel.send('https://www.youtube.com/')
            break;
        case 'version':
            //if you want a second argument: !info [second argument: version, author, etc.]
            if(args[1] == 'version'){
                message.channel.send('Version ' + Version);
            }else{
                message.channel.send(Version)
            }
            break;
        case 'info':
            //https://www.youtube.com/watch?v=tQjpv0OO5pA
            message.channel.send(info);
            break;
    }    

    //chat admin commands
    if(message.member.hasPermission(['MANAGE_NICKNAMES', 'MANAGE_MESSAGES'])){
        switch(args[0]){
            case 'purge':
                if(args[1]){
                    message.channel.bulkDelete(parseInt(args[1]) + 1);
                    if(args[1] == 1){
                        message.channel.send(args[1] + ' message has been deleted')
                        .catch(console.error);
                    } else {
                        message.channel.send(args[1] + ' messages have been deleted')
                        .catch(console.error); 
                    }
                } else return message.reply('Error, please specify an amount.')
                .catch(console.error)
                break;
            case '':
                break;
            default:
                break;
        }
    }


    //server admin commands
    //https://discord.js.org/#/docs/main/stable/class/GuildMember
    if(message.member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS', 'ADMINISTRATOR']) || message.member.hasPermission(['ADMINISTRATOR'])){
        let member = message.mentions.members.first();
        switch(args[0]){
            case 'kick':
                //https://discord.js.org/#/docs/main/stable/class/GuildMemberManager?scrollTo=kick
                if(args[1]){!
                    member.kick()
                    .then((member) =>{message.channel.send(":wave: " + member.displayName + " has been kicked!" )}) 
                    .catch(console.error);
                } else {
                    return message.reply('Error, please define a valid user.');
                }
                break;
            case 'ban':
                if(args[1]) {//add exception for admin-level members
                    member.ban()
                        .then((member) =>{message.channel.send(":hammer: " + member.displayName + " has been banned!")})
                        .catch(console.error);
                } else {
                    return message.reply('Error, please define a valid user.');
                }
            case 'info':
                if(!args[1]) return message.reply('If you want to see admin relevant commands use "!info admin"')
        }
    }
})

client.login(TOKEN);

