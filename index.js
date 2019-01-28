const Discord = require("discord.js");
const Enmap = require("enmap");
const client = new Discord.Client();
const active = new Map();
const http = require('http');
var fs = require('fs');
var qs = require('querystring');
//client.uInfo = new Enmap({ name: "uInfo" });
info = {
  guilds: {
    main: client.guilds.get("482253880701222922"),
    testing: client.guilds.get("515740603250901002"),
    staff: client.guilds.get("533430980271144980")
  },
  version: 'Alpha',
  badWords: {
    racist: ['nigger', 'nigga', 'negro'],
    derogatory: ['bitch', 'slut', 'thot', 'fucker', 'motherfucker', 'autistic'],
    homophobic: ['gay', 'lesbian', 'homo']
  }
}


//<========Rainbow Roles========>
function rainbowThing() {
  // let guild = client.guilds.get('482253880701222922');

  // const rbRoles = ['The Council ♛ '];
  // rbRoles.forEach(rbRole => {
  //    let myRole = guild.roles.find(role => role.name === rbRole);
  // myRole.setColor('RANDOM');
  // });
  let myRole = client.guilds.get('482253880701222922').roles.get('482255863592255488');
  myRole.setColor('RANDOM').catch(console.error);
  setTimeout(rainbowThing, 1000);
}

//<========/news Key Generator========>
key = "";
var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.-_";

for (var i = 0; i < 15; i++)
  key += possible.charAt(Math.floor(Math.random() * possible.length));

//<========Website========>
http.createServer(function (req, res) {
  if (req.url.substring(1) === key) {
    fs.readFile('accepted.html',(err, data) => {
      res.writeHead(200, { 'Content-Type': 'text/html', 'Content-Length': data.length });
      res.write(data);
      res.end();
    });
  }
  else {
    fs.readFile('denied.html',(err, data) => {
      console.log(data);
      res.writeHead(200, { 'Content-Type': 'text/html', 'Content-Length': data.length });
      res.write(data);
      res.end();
    });
  }
  if (req.method == 'POST') {
    var body = '';

    req.on('data', function (data) {
      body += data;

      // Too much POST data, kill the connection!
      // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
      if (body.length > 1e6)
        req.connection.destroy();
    });

    req.on('end', function () {
      var post = qs.parse(body);
      // use post['blah'], etc.
      printDate();
      console.log('New entry:\nTitle: ' + post['title'] + '\nContent: ' + post['content']);
      if (post['password'] == process.env.PASSWORD) {
        console.log('Accepted: true')
        exports.title = post['title'];
        exports.content = post['content'];
        exports.mention = post['mention'];

      }
      else { console.log('Accepted: false') }
    });
  }
}).listen(8000);

//<========Command Handler========>
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});
client.commands = new Enmap();
fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`Attempting to load command ${commandName}`);
    client.commands.set(commandName, props);
  });
});
client.on('ready', () => {
  console.log('I am ready!');
  client.user.setActivity("Hide and Go Seek | /help");
  console.log(key);
  lastInfo = '';
  //rainbowThing();
});
client.login(process.env.TOKEN);

//<========Welcome Message========>
client.on('guildMemberAdd', member => {

  const embed = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setAuthor(member.user.username, member.user.avatarURL)
    .setTitle("Welcome " + member.user.username + "!")
    .setDescription("You just joined Team Tazerous!\n**Team Tazerous** is a place to chill and have fun!\n\n⇢ Make sure to check out <#483494233089769482> for maximum enjoyment!")
    .setThumbnail(member.user.avatarURL)
    .addField("User", member.user, true)
    .addField("Member Count", member.guild.memberCount, true)
    .setTimestamp()
    .setFooter(client.user.username + " Alpha", client.user.avatarURL);

  member.guild.channels.get('483494339511844884').send({ embed });
});

//<========React Roles========>
// const yourID = '394336841203187714';
// const setupCMD = "/reaction";
// let initialMessage = `**React to the messages below to receive the associated role. If you would like to remove the role, simply remove your reaction!**`;
// const pinged = client.emojis.find(emoji => emoji.name === "pinged");
// console.log(pinged)
// const roles = ["Ping Subscriber"];
// const reactions = ['💩'];

// //Function to generate the role messages, based on your settings
// function generateMessages() {
//   var messages = [];
//   messages.push(initialMessage);
//   for (let role of roles) messages.push(`React below to get the **"${role}"** role!`); //DONT CHANGE THIS
//   return messages;
// }


// client.on("message", message => {
//   if (message.author.id == yourID && message.content.toLowerCase() == setupCMD) {
//     var toSend = generateMessages();
//     let mappedArray = [[toSend[0], false], ...toSend.slice(1).map((message, idx) => [message, reactions[idx]])];
//     for (let mapObj of mappedArray) {
//       message.channel.send(mapObj[0]).then(sent => {
//         if (mapObj[1]) {
//           sent.react(mapObj[1]);
//         }
//       });
//     }
//   }
// });


// client.on('raw', event => {
//   if (event.t === 'MESSAGE_REACTION_ADD' || event.t == "MESSAGE_REACTION_REMOVE") {

//     let channel = client.channels.get(event.d.channel_id);
//     let message = channel.fetchMessage(event.d.message_id).then(msg => {
//       let user = msg.guild.members.get(event.d.user_id);

//       if (msg.author.id == client.user.id && msg.content != initialMessage) {

//         if (user.id != client.user.id) {
//           var roleObj = msg.guild.roles.get('513587518134812682');
//           var memberObj = msg.guild.members.get(user.id);

//           if (event.t === "MESSAGE_REACTION_ADD") {
//             memberObj.addRole(roleObj)
//           } else {
//             memberObj.removeRole(roleObj);
//           }
//         }
//       }
//     })

//   }
// });

//<========Universal Chat BETA========>
client.on("message", message => {
  //If it isn't in the guild, block it before it causes an error
  if (message.channel.type != 'text') { return }
  const uChannels = ['530160194429386752', '530151470881046539', '534919203610820608']
  let isUChannel = false;
  uChannels.forEach(uChannel => {
    if (message.channel.id === uChannel) { isUChannel = true; }
  });

  var origin = message.guild

  if (isUChannel) {

    if (message.author.bot) { return }

    if (message.author == lastInfo.author && origin == lastInfo.guild) {
      lastInfo.message = lastInfo.message + '\n' + message;
      message.delete();
      const embed = new Discord.RichEmbed()
        .setColor(lastInfo.member.displayHexColor)
        .setAuthor(lastInfo.author.username, lastInfo.author.avatarURL)
        .setTitle(lastInfo.message)
        .setFooter(lastInfo.guild.name, lastInfo.guild.iconURL);

      messages.forEach(delMsg => { delMsg.delete(); });
      messages = [];
      uChannels.forEach(uChannel => {
        client.channels.get(uChannel).send({ embed }).then(msg => { messages.push(msg); });
      });

    }
    else {
      lastInfo = {
        author: message.author,
        member: message.member,
        guild: origin,
        message: message.cleanContent
      }
      message.delete();
      const embed = new Discord.RichEmbed()
        .setColor(message.member.displayHexColor)
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        .setTitle(message.cleanContent)
        .setFooter(origin.name, origin.iconURL);
      messages = [];
      uChannels.forEach(uChannel => {
        client.channels.get(uChannel).send({ embed }).then(msg => { messages.push(msg); });
      });
    }
  }
})

//<========Report + Delete========>
client.on('raw', event => {
  if (event.t === 'MESSAGE_REACTION_ADD') {

    let channel = client.channels.get(event.d.channel_id);
    let emojiName = event.d.emoji.name;
    let message = channel.fetchMessage(event.d.message_id).then(msg => {

      let user = msg.guild.members.get(event.d.user_id);

      let reporterP = client.fetchUser(user.id);
      reporterP.then(result => {

        if (emojiName === '❌' && result.id == '270067533544030208') {
          msg.delete();
        }

        else if (emojiName === 'report') {
          const embed = new Discord.RichEmbed()
            .setAuthor(msg.author.username, msg.author.avatarURL)
            .setTitle("Message Reported")
            .setURL(msg.url)
            .setDescription("Click to go to The message.")
            .addField("Message", msg.cleanContent)
            .setTimestamp()
            .setFooter('Reported by ' + result.username, result.avatarURL);
          client.channels.get('533439632243818518').send({ embed }).then(reportM => {
            reportM.react('534966426717519872');
          })
        }

        else if (emojiName === 'deletethis' && !result.bot && msg.channel.id == '533439632243818518') {
        let url = null;
          msg.embeds.forEach(embed => {
            url = embed.url.split('/');
          });

          client.channels.get(url[5]).fetchMessage(url[6]).then(delMessage => {
            delMessage.author.send(`A message you sent has been reported and deleted for violating the rules. The message was: ${delMessage.cleanContent}\nIf you think this is a mistake, contact a staff member.`)
            delMessage.delete()
          });
        }
      })
    })

  }
});
client.on("message", message => {
  if (message.author.bot) return;
  const msgArray = message.content.trim().split(' ');
  msgArray.forEach(msgTxt => {
    info.badWords.racist.forEach(word => {
      if (word !== msgTxt) { return }
      const embed = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle(`Message Automatically Reported`)
        .setURL(message.url)
        .setDescription(`Click to go to The message.\nReported for possible racist use of the word ${word}.`)
        .addField("Message", message.cleanContent)
        .setTimestamp()
        .setFooter('Reported by ' + client.user.username, client.user.avatarURL);
      client.channels.get('533439632243818518').send({ embed }).then(reportM => {
        reportM.react('534966426717519872');
      });
    });
    info.badWords.derogatory.forEach(word => {
      if (word !== msgTxt) { return }
      const embed = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle(`Message Automatically Reported`)
        .setURL(message.url)
        .setDescription(`Click to go to The message.\nReported for possible derogatory use of the word ${word}.`)
        .addField("Message", message.cleanContent)
        .setTimestamp()
        .setFooter('Reported by ' + client.user.username, client.user.avatarURL);
      client.channels.get('533439632243818518').send({ embed }).then(reportM => {
        reportM.react('534966426717519872');
      });
    });
    info.badWords.homophobic.forEach(word => {
      if (word !== msgTxt) { return }
      const embed = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle(`Message Automatically Reported`)
        .setURL(message.url)
        .setDescription(`Click to go to The message.\nReported for possible homophobic use of the word ${word}.`)
        .addField("Message", message.cleanContent)
        .setTimestamp()
        .setFooter('Reported by ' + client.user.username, client.user.avatarURL);
      client.channels.get('533439632243818518').send({ embed }).then(reportM => {
        reportM.react('534966426717519872');
      })
    });
  })
})