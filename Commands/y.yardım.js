const { dc, MessageEmbed } = require('discord.js')
const Settings = require('../Settings/Settings.json')
const Other = require('../Settings/Other.json')
var prefix = Settings.BotSettings.prefix
exports.run = async (client, message, args) => {
  
    let embed = new MessageEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
    .setTitle("Arvelos 1672 Komutları")
    .setDescription(`
    
    
<a:9a:919370673795772426> \`${prefix}kayıt\` **Kayıt menüsü**. <a:9a:920095224787771462>
<a:9a:919370673795772426> \`${prefix}modarator\`**Yetkili menüsü** <a:9a:920095224787771462> & <a:9a:920095225081372762>
<a:9a:919370673795772426> \`${prefix}eğlence\` **Eğlence menüsü** <a:9a:920095225081372762>
<a:9a:920095225081372762>.**Çalışmıyor demek**
<a:9a:920095224787771462>.**Çalışıyor demek**


`)
    .setTimestamp()
    .setFooter(`Arvelos 1672`)
    .setColor(Settings.Colors.Magenta)

  message.channel.send(embed)
}

module.exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["yardım"]
};

module.exports.help = {
  name: 'yardım'
};