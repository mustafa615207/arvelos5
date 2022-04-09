const { MessageEmbed } = require("discord.js");
const Settings = require("../Settings/Settings.json");
exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("MANAGE_ROLES"))
    return message.reply("YETKİN YOK");
  let embed = new MessageEmbed().setColor("RANDOM").setTimestamp();
  let tag = Settings.tag;
  let TagRole = Settings.TagRole;

  let taglılar = message.guild.members.cache.filter(
    (s) => s.user.username.includes(tag) && !s.roles.cache.has(TagRole)
  );
  let tagsızlar = message.guild.members.cache.filter(
    (s) => !s.user.username.includes(tag) && s.roles.cache.has(TagRole)
  );

  taglılar.array().forEach((Settings, index) => {
    setTimeout(async () => {
      Settings.roles.add(TagRole);
    }, index * 1000);
  });
  tagsızlar.array().forEach((Settings, index) => {
    setTimeout(async () => {
      Settings.roles.remove(TagRole);
    }, index * 1000);
  });
  message.channel.send(
    embed.setDescription(
      `**${taglılar.size}** Kullanıcıya taglı rolü verilecek.\n **${tagsızlar.size}** Kullanıcıdan taglı rolü alınacak.`
    )
  );
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["tg"],
  permLevel: 0,
  name: "tagtara",
};

exports.help = {
  name: "tagtara",
};
