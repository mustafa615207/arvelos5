const { dc, MessageEmbed } = require('discord.js')
const Settings = require('../Settings/Settings.json')
const Other = require('../Settings/Other.json')
var prefix = Settings.BotSettings.prefix
exports.run = async (client, message, args) => {
  
    let embed = new MessageEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
    .setTitle("Arvelos 1672 Modarasyon Komutları")
    .setDescription(`


<a:9a:919370673795772426>  ***BAKIMDA***  <a:9a:919370673795772426>
<a:9a:919370673795772426> \`${prefix}mute  @etiket <sebeb>\`**Üyeye Susturur.**     <a:9a:920095224787771462>
<a:9a:919370673795772426> \`${prefix}küfürlog  @etiket <sebeb>\`**Küfür log kanalını ayarlar**     <a:9a:920095224787771462>
<a:9a:919370673795772426> \`${prefix}küfürengel  @etiket <sebeb>\`**Küfürengel komutu açar kapar**     <a:9a:920095224787771462>
<a:9a:919370673795772426> \`${prefix}afk <adet>\` **Sunucuda afk moduna girersin.** <a:9a:920095224787771462>
<a:9a:919370673795772426> \`${prefix}sil <adet>\` **Mesajları siller.** <a:9a:920095224787771462>
<a:9a:919370673795772426> \`${prefix}otorol <#Kanal> <@&rol>\` **Oto rolu ayarlar** <a:9a:920095224787771462>
<a:9a:919370673795772426> \`${prefix}ban @etiket <sebeb>\` **Üyeyi yasaklar.** <a:9a:920095224787771462>
<a:9a:919370673795772426> \`${prefix}kilit\` **Hengi odada kuanılırsa odayı kilitler.** <a:9a:920095224787771462>
<a:9a:919370673795772426> \`${prefix}say\`**Suncudaki Üyelerin sayınısı gösterir.** <a:9a:920095224787771462>
<a:9a:919370673795772426> \`${prefix}ses-say\`**Suncudaki sesdeki üyeleri sayar** <a:9a:920095224787771462>
<a:9a:919370673795772426> \`${prefix}sesrol-ver <#kanal> <@&rol>\`**Suncudaki sesdeki üyelere rol verir** <a:9a:920095224787771462>
<a:9a:919370673795772426> \`${prefix}kilitaç\` **kilitli odanın kilitini açar.** <a:9a:920095224787771462>
<a:9a:919370673795772426> \`${prefix}git <@üye>\` **etiketlediniz kişinin yanına gidersiniz.** <a:9a:920095224787771462>
<a:9a:919370673795772426> \`${prefix}gel <@üye>\` **etiketlediniz kişiyi yanına çekersiniz.** <a:9a:920095224787771462>
<a:9a:919370673795772426> \`${prefix}son-görülme\`**Son görülme.**     <a:9a:920095224787771462>
<a:9a:919370673795772426> \`${prefix}mute  <@üye> <sure> <sebeb>\`**Üyeyi yazmasını engeller.**     <a:9a:920095224787771462>
<a:9a:919370673795772426> \`${prefix}rolver  @etiket <sebeb>\`**Üyeye rol veriri.**     <a:9a:920095224787771462>
<a:9a:919370673795772426> \`${prefix}rolal  @etiket <sebeb>\` **Üyeyeden rol alır.**     <a:9a:920095224787771462>
<a:9a:919370673795772426> \`${prefix}rolbilgi  @etiket <sebeb>\` **Etikeklenen rolun bilgisini alırsın**     <a:9a:920095224787771462>
<a:9a:919370673795772426> \`${prefix}uyar  @etiket <sebeb>\`**Üyeye uyarı atarsın**     <a:9a:920095224787771462>
<a:9a:919370673795772426> \`${prefix}modlog  \`**Üyeye uyarı atarsın**     <a:9a:920095224787771462>

<a:9a:919370673795772426> \`${prefix}rol info  @etiket\` **rolun yetkilenini ve kimlerde var onu gosterir.**     <a:9a:920095225081372762>.
<a:9a:919370673795772426> \`${prefix}jail  @etiket <sebeb>\`**Üyeye Hapse atar.**     <a:9a:920095225081372762>.
<a:9a:919370673795772426> \`${prefix}unjail  @etiket <sebeb>\`**Üyeye Hapisten çıkarır.**     <a:9a:920095225081372762>.


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
  aliases: ["modarator"]
};

module.exports.help = {
  name: 'modarator'
};