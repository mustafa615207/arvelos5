const { Discord, MessageEmbed} = require('discord.js')
const db = require('quick.db');
const Settings = require('../Settings/Settings.json')


exports.run = async (client, message, args) => {

    let erkekROL = Settings.erkekROL 
    let kayıtsızROL = Settings.kayıtsızROL
    let kayıtlıROL = Settings.kayıtlıROL
    let yetkili = Settings.yetkiliROL
    let kayıtLOG = Settings.kayıtLOG
    
    const yetkiliuyarı = new MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())
.setDescription(`Bu Komutu Kullanmak İçin <@&${yetkili}> Yetkisine Sahip Olman Gerek!`)
.setColor(`RED`)

    if(!message.member.roles.cache.has(yetkili)) return message.channel.send(yetkiliuyarı)


if(!args[0]) return message.channel.send(`Bir kişiyi etiketlemelisin.`)
  
let kullanıcı = message.mentions.users.first()
if(!kullanıcı) return message.channel.send(`${args[0]}, kullanıcısını sunucuda bulamıyorum.`)
if(kullanıcı.bot) return;
  
  
  
  const kurulus = new Date().getTime() - kullanıcı.createdAt.getTime();  
   var kontrol;
if (kurulus < 1296000000) kontrol = ' Şüpheli'
if (kurulus > 1296000000) kontrol = ' Güvenli'
  
  
  
let isim = args[1]

if(!isim) return message.channel.send(`Üyenin ismini belirtmelisin.`)

let yaş = args[2];
if(!yaş) return message.channel.send(`Üyenin yaşını belirtmelisin.`)
  
const emb = new MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())
.setThumbnail(client.user.avatarURL())
.setTimestamp()
.setFooter('Kayıt Saati')
.setColor(`#fffff0`)
let tag = Settings.tag || ''
message.guild.members.cache.get(kullanıcı.id).setNickname(`${tag} ${isim} | ${yaş}`)
message.guild.members.cache.get(kullanıcı.id).roles.add(erkekROL)
  message.guild.members.cache.get(kullanıcı.id).roles.add(kayıtlıROL)

message.guild.members.cache.get(kullanıcı.id).roles.remove(kayıtsızROL)
message.guild.members.cache.get(kullanıcı.id).send(emb.setDescription(`• Kaydın ${message.author} tarafından yapıldı. \n • **Erkek** ve **Kayıtlı** rollerini aldın. \n • Kurallar kanalımızı okumayı unutma!`))
 
let embed2 = new MessageEmbed()
.setDescription(`
• ${kullanıcı} adlı kullanıcı **${isim} | ${yaş}** olarak sunucumuza kayıt oldu. 
• Kaydını yapan kişi : ${message.author}
• <@&${Settings.erkekROL}> rollu verildi sunucumuzda **__Erkek__** olarak Kayıt edildi!
`)



client.channels.cache.get(Settings.kayıtLOG).send(embed2)
let embed3 = new MessageEmbed()
.setColor('WHITE')

.setDescription(`
• ${kullanıcı}  adlı kişinin kaydı başarıyla yapıldı.
• İsim Yaş • **${isim} | ${yaş}**
• Verilen Roller • <@&${Settings.erkekROL}> 
• Alınan Roller • <@&${Settings.kayıtsızROL}>

`)
message.channel.send(embed3).then(m => m.delete({timeout : '9999999'}))


}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['e'],
  permLevel: 0
};

exports.help = {
  name: 'denek'
}