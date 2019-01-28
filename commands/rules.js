exports.run = (client, message, args) => {
  message.channel.send("You got mail!").catch(console.error);

  message.author.send({embed: {
  color: 3447003,
  author: {
    name: client.user.username,
    icon_url: client.user.avatarURL
  },
  title: "Team Tazerous Discord Server Rules",
  url: "https://discordapp.com/channels/482253880701222922/483494233089769482",
  description: "Click to go to <#483494233089769482>.\nNOTE: This list does not constitute the full list of rules. At all times try to use common sense and good judgment for any action you're about to take.",
  fields: [{
      name: "⇸ **[ RULE #1 ] :: Kindness**",
      value: "_Kindness is the one thing that holds the world together. Team Tazerous is a kind, happy community with people we all can rely on._"
    },
    {
      name: "⇸ **[ RULE #2 ] :: Impersonation**",
      value: "_No impersonating Staff, YouTubers, or other members. This means don't pretend to be someone else._"
    },
    {
      name: "⇸ **⇸ [ RULE #3 ] :: Keep it Clean**",
      value: "No racial, sexist, or homophobic slurs. Additionally, try to keep sexual innuendos to a minimum. Remember, all standard Discord rules still apply._"
    },
    {
      name: "⇸ **[ RULE #4 ] :: Respect and Obey Staff**",
      value: "Respect and obey what the staff wants. They're here to help out! If you think they're doing something wrong, please contact a server administrator or higher._"
    },
    {
      name: "⇸ **[ RULE #5 ] :: Spamming**",
      value: "Do NOT spam in any channels. We do not tolerate spamming at all, and multiple incidents of spamming will result in a warning, and eventually a ban._"
    },
    {
      name: "⇸ **[ RULE #6 ] :: Evasion**",
      value: "Going on alternative accounts to avoid punishment will lead to a ban on both accounts._"
    },
    {
      name: "⇸ **[ RULE #7 ] :: Profile Pictures, Statuses, and Usernames**",
      value: "Use of an inappropriate profile picture, game status, or username will lead to a kick and warn. Staff will then tell you to change whatever is necessary._"
    },
  ],
  timestamp: new Date(),
  footer: {
    icon_url: client.user.avatarURL,
    text: client.user.username+" Alpha"
  }
}
});
}
