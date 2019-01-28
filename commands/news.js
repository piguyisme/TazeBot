exports.run = (client, message, args) => {
  const Discord = require("discord.js");
  var index = require('../index');
  if (message.author.id == '394336841203187714' || message.author.id == '270067533544030208') {
    switch (args[0]) {
      case 'url':

        message.channel.send("You got mail!").catch(console.error);

        message.author.send('https://TazeBot--piguyisme.repl.co/' + key);
        return;
      case 'preview':
        message.channel.send("You got mail!").catch(console.error);

        embed = new Discord.RichEmbed()
          .setColor(0x00AE86)
          .setAuthor(message.author.username, message.author.avatarURL)
          .setTitle(index.title)
          .setDescription(index.content)
          .setTimestamp()
          .setFooter(client.user.username + " Alpha", client.user.avatarURL);

        if (index.mention == 'sub') {
          message.author.send('@News Subscriber').catch(console.error);
        }
        else if (index.mention == 'all') {
          message.author.send('@everyone').catch(console.error);
        }
        else { null; }

        message.author.send({ embed }).catch(console.error);
        return;
      case 'post':

        embed = new Discord.RichEmbed()
          .setColor(0x00AE86)
          .setAuthor(message.author.username, message.author.avatarURL)
          .setTitle(index.title)
          .setDescription(index.content)
          .setTimestamp()
          .setFooter(client.user.username + " Alpha", client.user.avatarURL);
        if (index.mention == 'sub') {
          client.channels.get('483494311237910539').send('<@&513587518134812682>').catch(console.error);
        }
        else if (index.mention == 'all') {
          client.channels.get('483494311237910539').send('@everyone').catch(console.error);
        }
        else { null; }

        client.channels.get('483494311237910539').send({ embed }).catch(console.error);

        message.channel.send("Posted!").catch(console.error);
        return;
    }
  }

  else { message.channel.send("You don't have permission!").catch(console.error); }
}