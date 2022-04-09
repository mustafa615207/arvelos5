const { dc, MessageEmbed } = require('discord.js')
const Settings = require('../Settings/Settings.json')
const Other = require('../Settings/Other.json')
var prefix = Settings.BotSettings.prefix
exports.run = async (client, message, args) => {
  
    let embed = new MessageEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
    .setTitle("Register Komutları")
    .setDescription(`<a:9a:919370673795772426> \`${prefix}erkek/kadın @Üye İsim Yaş\` **Üye Kaydı Yapar**. <a:9a:920095224787771462>
<a:9a:919370673795772426> \`${prefix}isim @Üye İsim Yaş\`** Üye'nin İsmini Değiştirir.** <a:9a:920095224787771462>
<a:9a:919370673795772426> \`${prefix}isimler @Üye\` **Eski İsimleri Gösterir.** <a:9a:920095224787771462>
<a:9a:919370673795772426> \`${prefix}stat @Üye\` **Kayıt Bilgisini Gösterir.** <a:9a:920095224787771462>
<a:9a:919370673795772426> \`${prefix}kayıtsız @Üye\` **Kullanıcıyı Kayıtsıza Atar.** <a:9a:920095224787771462>
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
  aliases: ["kayıt"]
};

module.exports.help = {
  name: 'kayıt'
};