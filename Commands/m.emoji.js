const Discord = require("discord.js");

exports.run = (client, message, args) => {
  let dcsemoji = args[0];
  const emoji = message.guild.emojis.cache.find(
    tedoa => tedoa.name === `${dcsemoji}`
  );
  if (!dcsemoji)
    return message.channel.send(
      "Code Share | **Bir Emoji İsmi Yazmalsın!**"
    );
  const dcs = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor('Emoji Bilgileri ⏬')
    .setThumbnail(`${emoji.url}`)
    .addField("• Emojinin ismi", `${dcsemoji}`)
    .addField("• Emoji ID", `${emoji.id}`)
    .addField("• Link", `${emoji.url}`)
    .setFooter('Dcs Ekibi <3')
    .setTimestamp();
  message.channel.send(dcs);

};

exports.conf = {
  aliases: []
};

exports.help = {
  name: "em"
}; 