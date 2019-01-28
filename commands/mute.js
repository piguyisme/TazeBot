exports.run = (client, message, args) => {

  const Discord = require("discord.js");
  const staff = ['505947241647964160', '482256288022003723', '482256253003759638', '482263295785697280', '482256253003759638'];
  accepted = false;

  //If it isn't in the guild, block it before it causes an error
  if (message.channel.type != 'text') {
    message.channel.send("Please run this command in the Team Tazerous discord server.").catch(console.error);
    return;
  }
  if (message.guild.id != '482253880701222922') {
    message.channel.send("Please run this command in the Team Tazerous discord server.").catch(console.error);
    return;
  }

  subject = message.mentions.members.first();
  if (subject !== undefined) {

    if (message.member.roles.has(staff[0]) && !subject.roles.has(staff[0]) && !subject.roles.has(staff[1]) && !subject.roles.has(staff[2]) && !subject.roles.has(staff[3]) && !subject.roles.has(staff[4])) { accepted = true; }

    else if (message.member.roles.has(staff[1]) && !subject.roles.has(staff[1]) && !subject.roles.has(staff[2]) && !subject.roles.has(staff[3]) && !subject.roles.has(staff[4])) { accepted = true; }

    else if (message.member.roles.has(staff[2]) && !subject.roles.has(staff[2]) && !subject.roles.has(staff[3]) && !subject.roles.has(staff[4])) { accepted = true; }

    else if (message.member.roles.has(staff[3]) || message.author.id == '270067533544030208') { accepted = true }

    else { message.channel.send("You dont have permission. You can apply for staff [here](https://goo.gl/forms/J7G1JsCDoJfsDxOz1)").catch(console.error); }
  }
  else { message.channel.send("You didn't specify someone to mute.").catch(console.error); }
  if (accepted) {
    var roleObj = message.guild.roles.find(r => r.name === 'Muted');
    subject.addRole(roleObj);
    const embed = new Discord.RichEmbed()
      .setAuthor(message.author.username, message.author.avatarURL)
      .setTitle("User Muted")
      .setDescription(`${subject.displayName} muted by ${message.author}`)
      .setTimestamp()
      .setFooter(client.user.username + " Alpha", client.user.avatarURL);
    client.channels.get('500878579551174673').send({ embed });
  }
  else { return }

}