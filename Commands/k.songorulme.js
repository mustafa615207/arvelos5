const Discord = require("discord.js")
const use = require("useful-tools")
exports.run = async (client, message, args) => {
 message.channel.messages.fetch()
  const csu = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  if(!csu) return message.reply("**Bir Üye Belirtmen Gerek! \nÖrnek: `!son-görülme @UYE`**")
  if(csu){
    if(csu.lastMessageID){
    const channel = message.guild.channels.cache.get(csu.lastMessage.channel.id)
   if(channel){
     const mesaj = channel.messages.fetch(csu.lastMessageID)
     if(mesaj){
       const tarih = csu.lastMessage.createdTimestamp
       const cse = new Discord.MessageEmbed()
       .setTitle("Son Görülme Anı")
       .setDescription(`**<@${csu.id}> İsimli Üyenin Son Görülme Anı: \`${use.tarih(tarih)}\`**`)
       .setColor("BLUE")
       .setFooter("Made By. Code Share")
       .setTimestamp()
       message.channel.send(cse)
     } else {
         return message.reply("**Belirtilen Üyenin Son Mesajını Bulamadım!**") 
     }
   } else {
     return message.reply("**Belirtilen Üyenin Son Attığı Mesaja Ait Kanal Silinmiş!**")
   }
    } else {
  return message.reply("**Belirtilen Üyenin Son Mesajını Bulamadım!**")
    }
  }
}

exports.conf = {
  aliases: ["songörülme", "üyegörülme","sg"]
}

exports.help = {
  name: "son-görülme"
}