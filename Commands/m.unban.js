const dc = require("discord.js");
module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("BAN_MEMBERS"))
    return  message.channel.send(new dc.MessageEmbed().setDescription(
      "<@&959042275349000254> Rolun olmadan kulanamasın dostum"
    ));
  let unbanLog = message.guild.channels.cache.find(m => m.name === "ban-log");
  if (!unbanLog) {
    message.guild.channels.create("ban-log");
  }
  let bannedMember = args[0];
  if (!bannedMember)
    return message.channel.send(new dc.MessageEmbed().setDescription(
    "BAN KALDIRILACAK ID YAZ | **KULLANIM:** `unban @user <reason>`")
    );

  let bannedReason = args.slice(1).join(" ");
  if (!bannedReason)
   message.channel.send(new dc.MessageEmbed().setDescription(
     "BIR SEBEP YAZ | **KULLANIM:** `>unban @user <reason>`")
    );

  if (!message.guild.me.hasPermission("BAN_MEMBERS"))
    return  message.channel.send(new dc.MessageEmbed().setDescription("BAN KALDIRMA YETKIM YOK"));

  try {
    message.guild.members.unban(bannedMember, bannedReason);
    message. message.channel.send(new dc.MessageEmbed().setDescription(`${bannedMember} ID'li KISININ **BANI KALKTI**`));
  } catch (e) {
    console.log(e.message);
  }

  let unbanLogEmbed = new dc.MessageEmbed()
    .setAuthor(`BILDIRIM | Unban`)
    .setDescription(
      `**ID:** \`${bannedMember}\`\n
      \n**KALDIRAN:** ${message.author}\n
      \n**SEBEP:** \`${bannedReason}\`\n
      \n**BANIN KALKTIGI KANAL:** ${message.channel}`
    )
    .setColor("GREEN")
    .setTimestamp()
    .setFooter(message.guild.name);
  setTimeout(() => {
    message.guild.channels.cache.find(m => m.name === "ban-log").send(unbanLogEmbed);
  }, 3000);
};
module.exports.conf = {
  aliases: []
};
module.exports.help = {
  name: "unban"
}