exports.run = (client, message, args) => {
    message.channel.send("Hey, that's my line!").catch(console.error);
}