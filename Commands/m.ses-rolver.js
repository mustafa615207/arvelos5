const Discord = require("discord.js");
module.exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("MANAGE_ROLES"))
    return message.reply("**YETERSİZ YETKİ!**");
  let csc =
    message.mentions.channels.first() ||
    message.guild.channels.cache.get(args[0]);//discord.gg/turkiye
  if (!csc) return message.reply("**KANAL YAZMADIN!**\n**Kanal yazma komutu** \`<#kanalid>\`");
  let csr =
    message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);
  if (!csr) return message.reply("**VERİLECEK ROLÜ YAZMADIN!**");
  if (message.guild.channels.cache.get(csc.id)) {
    message.guild.channels.cache.get(csc.id).members.map(csm => {
      if (csm) {
        csm.roles.add(csr);
      }
      message.channel.send(
        "**Başarıyla Belirtlen Kanaldaki __\`" +
          csc.members.size +
          "\`__ Kişilere Belirtilen Rol Verildi!**"
      );
    });
  }
};
module.exports.conf = {
  aliases: []
};

module.exports.help = {
  name: "sesrol-ver"//by: Ege'#0001
};