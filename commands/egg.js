exports.run = (client, message, args) => {
  const sleep = require('sleep')

  message.delete();
  sleep.msleep(500)
  if (message.author.id == '270067533544030208') {
    switch (args[0]) {
      case '0':
        message.channel.send("And now, a message from the dev:").catch(console.error);
        message.channel.send("_end me_").catch(console.error);
        break;
    }
  }
  else if (message.author.id == '394336841203187714') {
    switch (args[0]) {
      case '0':
        message.channel.send("And now, a message from the owner:").catch(console.error);
        message.channel.send("_end me_").catch(console.error);
        break;
    }
  }
  else { return }
}
