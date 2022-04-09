const { dc, MessageEmbed } = require('discord.js')
const Settings = require('../Settings/Settings.json')
const Other = require('../Settings/Other.json')
var prefix = Settings.BotSettings.prefix
exports.run = async (client, message, args) => {
  
    let embed = new MessageEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
    .setTitle("Arvelos 1672 Eğlence Komutları")
    .setDescription(`
    
    
<a:9a:919370673795772426> \`${prefix}YAKINDA\` **Yeni eglence komutları çok yakında geliyor.**.
<a:9a:919370673795772426> \`${prefix}YAKINDA\`**Yeni eglence komutları çok yakında geliyor.**
<a:9a:919370673795772426> \`${prefix}YAKINDA\` **Yeni eglence komutları çok yakında geliyor.**


`)
    .setTimestamp()
    .setFooter(`Arvelos 1672`)
    .setColor(Settings.Colors.Magenta)

  message.channel.send(embed)
}

module.exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["eğlence"]
};

module.exports.help = {
  name: 'eğlence'
};