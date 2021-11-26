const exampleEmbed = new Discord.MessageEmbed()
	.setColor('#8c00ff')    //changes the colorful beam on the right of the message.
	.setTitle('Some title')     //changes the title of the entire card
	.setURL('https://discord.js.org/')  //the link which is underneath the title, if you click the title then it takes you to this website.
	.setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org') //1st arg is the author's name which is shown above the title, 2nd argument is the image before the authors name, 3rd arg is the link with the same mechanic as the title link.
	.setDescription('Some description here')    //the text below the title
	.setThumbnail('https://i.imgur.com/wSTFkRM.png')    //the picture on the top-right of the embed
	.addFields(
		{ name: 'Regular field title', value: 'Some value here' }, //creates one box
		{ name: '\u200B', value: '\u200B' },    //creates a space between boxes
		{ name: 'Inline field title', value: 'Some value here', inline: true }, //creates one box
		{ name: 'Inline field title', value: 'Some value here', inline: true }, //creates one box, these are not seperated if inline is true: the are next to each other
	)   //way of making multiple boxes in which you can write information
	.addField('Inline field title', 'Some value here', true)    //creates a single box
	.setImage('https://i.imgur.com/wSTFkRM.png') //changes the image on the bottom, can be used anywhere (i hope)
	.setTimestamp() //Will automatically adjust the timezone depending on the user's device
    .setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png'); //foottext, constructed like the author box
    