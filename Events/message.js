const Discord = require("discord.js");
const Settings = require('../Settings/Settings.json');
let talkedRecently = new Set();

module.exports = message => {
  if (talkedRecently.has(message.author.id)) {
    return;
  }
  talkedRecently.add(message.author.id);
	setTimeout(() => {
    talkedRecently.delete(message.author.id);
  }, 0);
  let client = message.client;
  if (message.author.bot) return;
  if (!message.content.startsWith(Settings.BotSettings.prefix)) return;
  let command = message.content.split(' ')[0].slice(Settings.BotSettings.prefix.length);
  let params = message.content.split(' ').slice(1);
  let perms = client.elevation(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  } else {
    message.channel.send(message.author, new Discord.MessageEmbed().setColor("ff0000").setAuthor('Sanırım, yanlış bir şey yazdın.').setDescription(`**${message.author.username}** Komutlarımda  \`${Settings.prefix}${command}\` adında bir komut bulamadım.`).setFooter(`Tüm komutları ayrıntılı bir şekilde görüntülemek için ${Settings.prefix}yardım`)).then(m => m.delete({timeout: 90000}))
  }
  
  
  if (cmd) {
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  }

};
