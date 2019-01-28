exports.run = (client, message, args) => {
  const Discord = require("discord.js");
  const embed = new Discord.RichEmbed()
    .setAuthor(client.user.username, client.user.avatarURL)
    .setTitle("Team Tazerous Discord Server Help")
    .setURL("https://discordapp.com/channels/482253880701222922/513743555617882153")
    .setDescription("Click to go to frequently asked questions.")
    .addField("Rules", "Type **/rules** or go to <#483494233089769482>.")
    .setTimestamp()
    .setFooter(client.user.username + " Alpha", client.user.avatarURL)

  message.channel.send("You got mail!").catch(console.error);

  message.author.send({ embed });
}