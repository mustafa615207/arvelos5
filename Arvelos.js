const Discord = require("discord.js");
Discord.Constants.DefaultOptions.ws.properties.$browser = "Discord Android";
const client = new Discord.Client();
const Settings = require("./Settings/Settings.json");
const Other = require("./Settings/Other.json");
const chalk = require("chalk");
require("discord-buttons")(client);

const moment = require("moment");
var Jimp = require("jimp");
const { Client, Util } = require("discord.js");
const fs = require("fs");

const db = require("quick.db");
const express = require("express");
require("./Util/eventLoader.js")(client);
const path = require("path");
const snekfetch = require("snekfetch");

client.on("ready", async () => {
  setInterval(() => {
    let mesajlar = [`1`, `2`, `3`, `4`, `5`, `6`, `7`];

    const mesaj = mesajlar[Math.floor(Math.random() * mesajlar.length)];

    client.user.setPresence({
      status: "dnd",
      activity: {
        name: mesaj, //Durumda Ne Yazıcak
        type: "https://www.twitch.tv/deadyilmaz", //Buraya Kendi Twitch Linkinizi Yapıştırabilirsiniz.
      },
    });
  }, 30000); //1000= 1 saniye - 30000=30 saniye
});

var prefix = Settings.BotSettings.prefix;

const log = (message) => {
  console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./Commands/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} Adet Komut Yüklenecek.`);
  files.forEach((f) => {
    let props = require(`./Commands/${f}`);
    log(`[+] Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach((alias) => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = (command) => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./Commands/${command}`)];
      let cmd = require(`./Commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach((alias) => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = (command) => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./Commands/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach((alias) => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = (command) => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./Commands/${command}`)];
      let cmd = require(`./Commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = (message) => {
  if (!message.guild) {
    return;
  }

  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === Settings.BotSettings.Owner) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
//client.on('debug', e => {
//  console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
//});
client.on("warn", (e) => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});
client.on("error", (e) => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(Settings.BotSettings.token);

client.on("message", (msg) => {
  if (msg.content.toLowerCase() === "sa") {
    msg.channel.send("Aleyküm Selam Gardaş Welcome");
  }
  if (msg.content.toLowerCase() === "Selamın aleyküm") {
    msg.channel.send("Aleyküm Selam Gardaş Welcome");
  }
  if (msg.content.toLowerCase() === "slm") {
    msg.channel.send("Aleyküm Selam Gardaş Welcome");
  }
  if (msg.content.toLowerCase() === "tag") {
    msg.channel.send("ℵ");
  }
});
//////////////////////////////////////////////////////////////
client.on("message", (message) => {
  if (message.content === `<@491680608301613066>`) {
    message.reply("Şüan sahibim çalışıyor rahatsız etmeyin lütfen <3");
  }
});

client.on("message", (message) => {
  if (message.content === `<@907680432785620992>`) {
    message.reply(
      "***__Sunucu sayibi etiketlenmeyi sevmiyor lütfen etiket atma son uyarım bu !!!__***"
    );
  }
});
client.on("message", (message) => {
  if (message.content === `<@960131121004314665>`) {
    message.reply(
      "***Beni etiketledin Yardım menume `yarıdm` Yaparak gidebilirsin Dostum***"
    );
  }
});
client.on("ready", () => {
  client.channels.get("959042275411918866").join();
});
//-----------------------------------------------Komutlar------------------------------------------------\\
client.on("guildMemberAdd", async (member) => {
  member.roles.add(Settings.Roles.Unregister);
  member.setNickname(Settings.Welcome.WelcomeName);
});

client.on("ready", async () => {
  let botVoiceChannel = client.channels.cache.get(
    Settings.BotSettings.botVoiceChannelID
  );
  if (botVoiceChannel)
    botVoiceChannel
      .join()
      .catch((err) =>
        console.error(
          "Bot Ses Kanalına Bağlanamıyor, Lütfen Ses Kanal ID'sini Kontrol Et."
        )
      );
});

client.on("guildMemberAdd", (member) => {
  let los = client.users.cache.get(member.id);
  require("moment-duration-format");
  const kurulus = new Date().getTime() - los.createdAt.getTime();

  var üyesayısı = member.guild.members.cache.size
    .toString()
    .replace(/ /g, "    ");
  var üs = üyesayısı.match(/([0-9])/g);
  üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase();
  if (üs) {
    üyesayısı = üyesayısı.replace(/([0-9])/g, (d) => {
      return {
        0: Other.EmojiNumbers.Zero,
        1: Other.EmojiNumbers.One,
        2: Other.EmojiNumbers.Two,
        3: Other.EmojiNumbers.Three,
        4: Other.EmojiNumbers.Four,
        5: Other.EmojiNumbers.Five,
        6: Other.EmojiNumbers.Six,
        7: Other.EmojiNumbers.Seven,
        8: Other.EmojiNumbers.Eight,
        9: Other.EmojiNumbers.Nine,
      }[d];
    });
  }

  var kontrol;
  if (kurulus < 1296000000)
    kontrol = `Hesap Durumu: **Güvenilir Değil** ${Other.EmojiGeneral.Çarpı}`;
  if (kurulus > 1296000000)
    kontrol = `Hesap Durumu: **Güvenilir** ${Other.EmojiGeneral.Tik}`;
  moment.locale("tr");
  const kanal = member.guild.channels.cache.get(Settings.Welcome.WelcomeChat);
  const kuruluss = new Date().getTime() - los.createdAt.getTime();
  const gecen = moment
    .duration(kuruluss)
    .format(
      `YY **[Yıl,]** DD **[Gün,]** HH **[Saat,]** mm **[Dakika,]** ss **[Saniye]**`
    );
  const embed = new Discord.MessageEmbed()
    .setTitle(`Sunucumuza Hoşgeldin ${member.user.username}`)
    .setThumbnail(member.user.avatarURL({ dynamic: true }))
    .setDescription(
      `
  
  ${Other.EmojiGeneral.Emoji1} • Sunucumuza Hoşeldin ${los} !
  
  ${Other.EmojiGeneral.Emoji2} • Seninle Beraber Sunucumuzda ` +
        üyesayısı +
        ` Değerli İnsan Oldu.
  
  ${Other.EmojiGeneral.Emoji3} • Hesabın \`` +
        gecen +
        `\` Önce Oluşturulmuş.
  
  ${Other.EmojiGeneral.Emoji4} • ` +
        kontrol +
        `
  
  ${Other.EmojiGeneral.Emoji5} • <@&${Settings.Roles.Registerer}> Rolündeki Yetkililer Seninle İlgilenicektir.
  
  ${Other.EmojiGeneral.Emoji6} • Soldaki \`ℵ︱V.Confirmation ¹\` Odalarından Birine Geçerek Kaydolabilirsin.
  
  ${Other.EmojiGeneral.Emoji7} • Tagımızı Alarak \`${Settings.ServerSettings.Tag}\` Ailemizin Bir Parçası Olabilirsin.`
    )
    .setColor("RANDOM");
  kanal.send(`<@&${Settings.Roles.Registerer}>`);
  kanal.send(embed);

  //------------------------------------------------------------------------------------------------------------------------------------\\

  //------------------------------------------------------------------------------------------------------------------------------------\\

  //-----------------------TAG-ROL----------------------\\
  client.on("userUpdate", async (oldUser, newUser) => {
    if (oldUser.username !== newUser.username) {
      const tag = "ℵ";
      const sunucu = "959042275290271774";
      const kanal = "959042277521625100";
      const rol = "959042275332194378";

      try {
        if (
          newUser.username.includes(tag) &&
          !client.guilds.cache
            .get(sunucu)
            .members.cache.get(newUser.id)
            .roles.cache.has(rol)
        ) {
          await client.channels.cache
            .get(kanal)
            .send(
              new Discord.MessageEmbed()
                .setColor("GREEN")
                .setDescription(
                  `${newUser} ${tag} Tagımızı Aldığı İçin <@&${rol}> Rolünü Verdim`
                )
            );
          await client.guilds.cache
            .get(sunucu)
            .members.cache.get(newUser.id)
            .roles.add(rol);
          await client.guilds.cache
            .get(sunucu)
            .members.cache.get(newUser.id)
            .send(
              `Selam ${
                newUser.username
              }, Sunucumuzda ${tag} Tagımızı Aldığın İçin ${
                client.guilds.cache.get(sunucu).roles.cache.get(rol).name
              } Rolünü Sana Verdim!`
            );
        }
        if (
          !newUser.username.includes(tag) &&
          client.guilds.cache
            .get(sunucu)
            .members.cache.get(newUser.id)
            .roles.cache.has(rol)
        ) {
          await client.channels.cache
            .get(kanal)
            .send(
              new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription(
                  `${newUser} ${tag} Tagımızı Çıkardığı İçin <@&${rol}> Rolünü Aldım`
                )
            );
          await client.guilds.cache
            .get(sunucu)
            .members.cache.get(newUser.id)
            .roles.remove(rol);
          await client.guilds.cache
            .get(sunucu)
            .members.cache.get(newUser.id)
            .send(
              `Selam **${
                newUser.username
              }**, Sunucumuzda ${tag} Tagımızı Çıkardığın İçin ${
                client.guilds.cache.get(sunucu).roles.cache.get(rol).name
              } Rolünü Senden Aldım!`
            );
        }
      } catch (e) {
        console.log(`Bir hata oluştu! ${e}`);
      }
    }
  });

  //Serendia'dan alınıp V12 Çevirilmiştir!
  //-----------------------TAG-ROL----------------------\\

  //----------------------TAG-KONTROL----------------------\\

  //-----------------------TAG-KONTROL----------------------\\
});

//-----------------------Guard----------------------\\

/////////////////////////////////////////////////////////////////////////////
/////////////////// ROL KORUMA //////////////////////////////

/////////////////// ROL KORUMA //////////////////////////////
/////////////////////////////////////////////////////////////////////////////
////////////////// ses log ////////////////////////////
client.on("voiceStateUpdate", async (oldState, newState) => {
  const csl = client.channels.cache.get("959042277521625102");
  if (!oldState.member.user.bot) {
    if (!oldState.channel && newState.channel) {
      //discord.gg/turkiye
      csl.send(
        `\`${newState.member.user.tag}\` İsimli Üye \`${newState.channel.name}\` İsimli Sesli Odaya Giriş Yaptı!`
      );
    }

    if (oldState.channel && !newState.channel) {
      csl.send(
        `\`${oldState.member.user.tag}\` İsimli Üye \`${oldState.channel.name}\` İsimli Odadan Çıkış Yaptı!`
      );
    }

    if (oldState.channel && newState.channel) {
      //by: Ege'#0001
      csl.send(
        `\`${oldState.member.user.tag}\` İsimli Üye \`${oldState.channel.name}\` İsimli Sesli Kanaldan \`${newState.channel.name}\` İsimli Sesli Kanala Geçiş Yaptı!`
      );
    }
  }
});
////////////////// seslog son ////////////////////////////

//ModLog Baş
client.on("message", async (msg, member, guild) => {
  let i = await db.fetch(`saas_${msg.guild.id}`);
  if (i === "açık") {
    if (msg.content.toLowerCase() === "sa") {
      msg.reply("**Aleyküm Selam Hoşgeldin.**");
    }
  }
});

client.on("messageDelete", async (message) => {
  if (message.author.bot || message.channel.type == "dm") return;

  let log = message.guild.channels.cache.get(
    await db.fetch(`log_${message.guild.id}`)
  );

  if (!log) return;

  const embed = new Discord.MessageEmbed()

    .setTitle(message.author.username + " | Mesaj Silindi")

    .addField("Kullanıcı: ", message.author)

    .addField("Kanal: ", message.channel)

    .addField("Mesaj: ", "" + message.content + "");

  log.send(embed);
});

client.on("messageUpdate", async (oldMessage, newMessage) => {
  let modlog = await db.fetch(`log_${oldMessage.guild.id}`);

  if (!modlog) return;

  let embed = new Discord.MessageEmbed()

    .setAuthor(oldMessage.author.username, oldMessage.author.avatarURL())

    .addField("**Eylem:**", "Mesaj Düzenleme")

    .addField(
      "**Mesajın sahibi:**",
      `<@${oldMessage.author.id}> === **${oldMessage.author.id}**`
    )

    .addField("**Eski Mesajı:**", `${oldMessage.content}`)

    .addField("**Yeni Mesajı:**", `${newMessage.content}`)

    .setTimestamp()

    .setColor("#ff0000")

    .setFooter(
      `Sunucu: ${oldMessage.guild.name} - ${oldMessage.guild.id}`,
      oldMessage.guild.iconURL()
    )

    .setThumbnail(oldMessage.guild.iconURL);

  client.channels.cache.get(modlog).send(embed);
});

client.on("channelCreate", async (channel) => {
  let modlog = await db.fetch(`log_${channel.guild.id}`);

  if (!modlog) return;

  const entry = await channel.guild
    .fetchAuditLogs({ type: "CHANNEL_CREATE" })
    .then((audit) => audit.entries.first());

  let kanal;

  if (channel.type === "text") kanal = `<#${channel.id}>`;

  if (channel.type === "voice") kanal = `\`${channel.name}\``;

  let embed = new Discord.MessageEmbed()

    .setAuthor(entry.executor.username, entry.executor.avatarURL())

    .addField("**Eylem:**", "Kanal Oluşturma")

    .addField("**Kanalı Oluşturan Kişi:**", `<@${entry.executor.id}>`)

    .addField("**Oluşturduğu Kanal:**", `${kanal}`)

    .setTimestamp()

    .setColor("#ff0000")

    .setFooter(
      `Sunucu: ${channel.guild.name} - ${channel.guild.id}`,
      channel.guild.iconURL()
    )

    .setThumbnail(channel.guild.iconUR);

  client.channels.cache.get(modlog).send(embed);
});

client.on("channelDelete", async (channel) => {
  let modlog = await db.fetch(`log_${channel.guild.id}`);

  if (!modlog) return;

  const entry = await channel.guild
    .fetchAuditLogs({ type: "CHANNEL_DELETE" })
    .then((audit) => audit.entries.first());

  let embed = new Discord.MessageEmbed()

    .setAuthor(entry.executor.username, entry.executor.avatarURL())

    .addField("**Eylem:**", "Kanal Silme")

    .addField("**Kanalı Silen Kişi:**", `<@${entry.executor.id}>`)

    .addField("**Silinen Kanal:**", `\`${channel.name}\``)

    .setTimestamp()

    .setColor("#ff0000")

    .setFooter(
      `Sunucu: ${channel.guild.name} - ${channel.guild.id}`,
      channel.guild.iconURL()
    )

    .setThumbnail(channel.guild.iconURL);

  client.channels.cache.get(modlog).send(embed);
});

client.on("roleCreate", async (role) => {
  let modlog = await db.fetch(`log_${role.guild.id}`);

  if (!modlog) return;

  const entry = await role.guild
    .fetchAuditLogs({ type: "ROLE_CREATE" })
    .then((audit) => audit.entries.first());

  let embed = new Discord.MessageEmbed()

    .setAuthor(entry.executor.username, entry.executor.avatarURL())

    .addField("**Eylem:**", "Rol Oluşturma")

    .addField("**Rolü Oluşturan Kişi:**", `<@${entry.executor.id}>`)

    .addField("**Oluşturulan Rol:**", `\`${role.name}\` **=** \`${role.id}\``)

    .setTimestamp()

    .setFooter(
      `Sunucu: ${role.guild.name} - ${role.guild.id}`,
      role.guild.iconURL
    )

    .setColor("#ff0000")

    .setThumbnail(role.guild.iconURL);

  client.channels.cache.get(modlog).send(embed);
});

client.on("roleDelete", async (role) => {
  let modlog = await db.fetch(`log_${role.guild.id}`);

  if (!modlog) return;

  const entry = await role.guild
    .fetchAuditLogs({ type: "ROLE_DELETE" })
    .then((audit) => audit.entries.first());

  let embed = new Discord.MessageEmbed()

    .setAuthor(entry.executor.username, entry.executor.avatarURL())

    .addField("**Eylem:**", "Rol Silme")

    .addField("**Rolü Silen Kişi:**", `<@${entry.executor.id}>`)

    .addField("**Silinen Rol:**", `\`${role.name}\` **=** \`${role.id}\``)

    .setTimestamp()

    .setFooter(
      `Sunucu: ${role.guild.name} - ${role.guild.id}`,
      role.guild.iconURL
    )

    .setColor("#ff0000")

    .setThumbnail(role.guild.iconURL);

  client.channels.cache.get(modlog).send(embed);
});

client.on("emojiCreate", async (emoji) => {
  let modlog = await db.fetch(`log_${emoji.guild.id}`);

  if (!modlog) return;

  const entry = await emoji.guild
    .fetchAuditLogs({ type: "EMOJI_CREATE" })
    .then((audit) => audit.entries.first());

  let embed = new Discord.MessageEmbed()

    .setAuthor(entry.executor.username, entry.executor.avatarURL())

    .addField("**Eylem:**", "Emoji Oluşturma")

    .addField("**Emojiyi Oluşturan Kişi:**", `<@${entry.executor.id}>`)

    .addField("**Oluşturulan Emoji:**", `${emoji} - İsmi: \`${emoji.name}\``)

    .setTimestamp()

    .setColor("#ff0000")

    .setFooter(
      `Sunucu: ${emoji.guild.name} - ${emoji.guild.id}`,
      emoji.guild.iconURL
    )

    .setThumbnail(emoji.guild.iconURL);

  client.channels.cache.get(modlog).send(embed);
});

client.on("emojiDelete", async (emoji) => {
  let modlog = await db.fetch(`log_${emoji.guild.id}`);

  if (!modlog) return;

  const entry = await emoji.guild
    .fetchAuditLogs({ type: "EMOJI_DELETE" })
    .then((audit) => audit.entries.first());

  let embed = new Discord.MessageEmbed()

    .setAuthor(entry.executor.username, entry.executor.avatarURL())

    .addField("**Eylem:**", "Emoji Silme")

    .addField("**Emojiyi Silen Kişi:**", `<@${entry.executor.id}>`)

    .addField("**Silinen Emoji:**", `${emoji}`)

    .setTimestamp()

    .setFooter(
      `Sunucu: ${emoji.guild.name} - ${emoji.guild.id}`,
      emoji.guild.iconURL
    )

    .setColor("#ff0000")

    .setThumbnail(emoji.guild.iconURL);

  client.channels.cache.get(modlog).send(embed);
});

client.on("emojiUpdate", async (oldEmoji, newEmoji) => {
  let modlog = await db.fetch(`log_${oldEmoji.guild.id}`);

  if (!modlog) return;

  const entry = await oldEmoji.guild
    .fetchAuditLogs({ type: "EMOJI_UPDATE" })
    .then((audit) => audit.entries.first());

  let embed = new Discord.MessageEmbed()

    .setAuthor(entry.executor.username, entry.executor.avatarURL())

    .addField("**Eylem:**", "Emoji Güncelleme")

    .addField("**Emojiyi Güncelleyen Kişi:**", `<@${entry.executor.id}>`)

    .addField(
      "**Güncellenmeden Önceki Emoji:**",
      `${oldEmoji} - İsmi: \`${oldEmoji.name}\``
    )

    .addField(
      "**Güncellendikten Sonraki Emoji:**",
      `${newEmoji} - İsmi: \`${newEmoji.name}\``
    )

    .setTimestamp()

    .setColor("#ff0000")

    .setFooter(
      `Sunucu: ${oldEmoji.guild.name} - ${oldEmoji.guild.id}`,
      oldEmoji.guild.iconURL
    )

    .setThumbnail(oldEmoji.guild.iconURL);

  client.channels.cache.get(modlog).send(embed);
});

client.on("guildBanAdd", async (guild, user) => {
  let modlog = await db.fetch(`log_${guild.id}`);

  if (!modlog) return;

  const entry = await guild
    .fetchAuditLogs({ type: "MEMBER_BAN_ADD" })
    .then((audit) => audit.entries.first());

  let embed = new Discord.MessageEmbed()

    .setAuthor(entry.executor.username, entry.executor.avatarURL())

    .addField("**Eylem:**", "Yasaklama")

    .addField("**Kullanıcıyı Yasaklayan Yetkili:**", `<@${entry.executor.id}>`)

    .addField("**Yasaklanan Kullanıcı:**", `**${user.tag}** - ${user.id}`)

    .addField("**Yasaklanma Sebebi:**", `${entry.reason}`)

    .setTimestamp()

    .setColor("#ff0000")

    .setFooter(`Sunucu: ${guild.name} - ${guild.id}`, guild.iconURL)

    .setThumbnail(guild.iconURL);

  client.channels.cache.get(modlog).send(embed);
});

client.on("guildBanRemove", async (guild, user) => {
  let modlog = await db.fetch(`log_${guild.id}`);

  if (!modlog) return;

  const entry = await guild
    .fetchAuditLogs({ type: "MEMBER_BAN_REMOVE" })
    .then((audit) => audit.entries.first());

  let embed = new Discord.MessageEmbed()

    .setAuthor(entry.executor.username, entry.executor.avatarURL())

    .addField("**Eylem:**", "Yasak Kaldırma")

    .addField("**Yasağı Kaldıran Yetkili:**", `<@${entry.executor.id}>`)

    .addField(
      "**Yasağı Kaldırılan Kullanıcı:**",
      `**${user.tag}** - ${user.id}`
    )

    .setTimestamp()

    .setColor("#ff0000")

    .setFooter(`Sunucu: ${guild.name} - ${guild.id}`, guild.iconURL)

    .setThumbnail(guild.iconURL);

  client.channels.cache.get(modlog).send(embed);
});
// ModLog Son

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const küfür = [
  "abaza",
  "abazan",
  "ag",
  "a\u011fz\u0131na s\u0131\u00e7ay\u0131m",
  "ahmak",
  "allah",
  "allahs\u0131z",
  "am",
  "amar\u0131m",
  "ambiti",
  "am biti",
  "amc\u0131\u011f\u0131",
  "amc\u0131\u011f\u0131n",
  "amc\u0131\u011f\u0131n\u0131",
  "amc\u0131\u011f\u0131n\u0131z\u0131",
  "amc\u0131k",
  "amc\u0131k ho\u015faf\u0131",
  "amc\u0131klama",
  "amc\u0131kland\u0131",
  "amcik",
  "amck",
  "amckl",
  "amcklama",
  "amcklaryla",
  "amckta",
  "amcktan",
  "amcuk",
  "am\u0131k",
  "am\u0131na",
  "am\u0131nako",
  "am\u0131na koy",
  "am\u0131na koyar\u0131m",
  "am\u0131na koyay\u0131m",
  "am\u0131nakoyim",
  "am\u0131na koyyim",
  "am\u0131na s",
  "am\u0131na sikem",
  "am\u0131na sokam",
  "am\u0131n feryad\u0131",
  "am\u0131n\u0131",
  "am\u0131n\u0131 s",
  "am\u0131n oglu",
  "am\u0131no\u011flu",
  "am\u0131n o\u011flu",
  "am\u0131s\u0131na",
  "am\u0131s\u0131n\u0131",
  "amina",
  "amina g",
  "amina k",
  "aminako",
  "aminakoyarim",
  "amina koyarim",
  "amina koyay\u0131m",
  "amina koyayim",
  "aminakoyim",
  "aminda",
  "amindan",
  "amindayken",
  "amini",
  "aminiyarraaniskiim",
  "aminoglu",
  "amin oglu",
  "amiyum",
  "amk",
  "amkafa",
  "amk \u00e7ocu\u011fu",
  "amlarnzn",
  "aml\u0131",
  "amm",
  "ammak",
  "ammna",
  "amn",
  "amna",
  "amnda",
  "amndaki",
  "amngtn",
  "amnn",
  "amona",
  "amq",
  "ams\u0131z",
  "amsiz",
  "amsz",
  "amteri",
  "amugaa",
  "amu\u011fa",
  "amuna",
  "ana",
  "anaaann",
  "anal",
  "analarn",
  "anam",
  "anamla",
  "anan",
  "anana",
  "anandan",
  "anan\u0131",
  "anan\u0131",
  "anan\u0131n",
  "anan\u0131n am",
  "anan\u0131n am\u0131",
  "anan\u0131n d\u00f6l\u00fc",
  "anan\u0131nki",
  "anan\u0131sikerim",
  "anan\u0131 sikerim",
  "anan\u0131sikeyim",
  "anan\u0131 sikeyim",
  "anan\u0131z\u0131n",
  "anan\u0131z\u0131n am",
  "anani",
  "ananin",
  "ananisikerim",
  "anani sikerim",
  "ananisikeyim",
  "anani sikeyim",
  "anann",
  "ananz",
  "anas",
  "anas\u0131n\u0131",
  "anas\u0131n\u0131n am",
  "anas\u0131 orospu",
  "anasi",
  "anasinin",
  "anay",
  "anayin",
  "angut",
  "anneni",
  "annenin",
  "annesiz",
  "anuna",
  "aptal",
  "aq",
  "a.q",
  "a.q.",
  "aq.",
  "ass",
  "atkafas\u0131",
  "atm\u0131k",
  "att\u0131rd\u0131\u011f\u0131m",
  "attrrm",
  "auzlu",
  "avrat",
  "ayklarmalrmsikerim",
  "azd\u0131m",
  "azd\u0131r",
  "azd\u0131r\u0131c\u0131",
  "babaannesi ka\u015far",
  "baban\u0131",
  "baban\u0131n",
  "babani",
  "babas\u0131 pezevenk",
  "baca\u011f\u0131na s\u0131\u00e7ay\u0131m",
  "bac\u0131na",
  "bac\u0131n\u0131",
  "bac\u0131n\u0131n",
  "bacini",
  "bacn",
  "bacndan",
  "bacy",
  "bastard",
  "basur",
  "beyinsiz",
  "b\u0131z\u0131r",
  "bitch",
  "biting",
  "bok",
  "boka",
  "bokbok",
  "bok\u00e7a",
  "bokhu",
  "bokkkumu",
  "boklar",
  "boktan",
  "boku",
  "bokubokuna",
  "bokum",
  "bombok",
  "boner",
  "bosalmak",
  "bo\u015falmak",
  "cenabet",
  "cibiliyetsiz",
  "cibilliyetini",
  "cibilliyetsiz",
  "cif",
  "cikar",
  "cim",
  "\u00e7\u00fck",
  "dalaks\u0131z",
  "dallama",
  "daltassak",
  "dalyarak",
  "dalyarrak",
  "dangalak",
  "dassagi",
  "diktim",
  "dildo",
  "dingil",
  "dingilini",
  "dinsiz",
  "dkerim",
  "domal",
  "domalan",
  "domald\u0131",
  "domald\u0131n",
  "domal\u0131k",
  "domal\u0131yor",
  "domalmak",
  "domalm\u0131\u015f",
  "domals\u0131n",
  "domalt",
  "domaltarak",
  "domalt\u0131p",
  "domalt\u0131r",
  "domalt\u0131r\u0131m",
  "domaltip",
  "domaltmak",
  "d\u00f6l\u00fc",
  "d\u00f6nek",
  "d\u00fcd\u00fck",
  "eben",
  "ebeni",
  "ebenin",
  "ebeninki",
  "ebleh",
  "ecdad\u0131n\u0131",
  "ecdadini",
  "embesil",
  "emi",
  "fahise",
  "fahi\u015fe",
  "feri\u015ftah",
  "ferre",
  "fuck",
  "fucker",
  "fuckin",
  "fucking",
  "gavad",
  "gavat",
  "geber",
  "geberik",
  "gebermek",
  "gebermi\u015f",
  "gebertir",
  "ger\u0131zekal\u0131",
  "gerizekal\u0131",
  "gerizekali",
  "gerzek",
  "giberim",
  "giberler",
  "gibis",
  "gibi\u015f",
  "gibmek",
  "gibtiler",
  "goddamn",
  "godo\u015f",
  "godumun",
  "gotelek",
  "gotlalesi",
  "gotlu",
  "gotten",
  "gotundeki",
  "gotunden",
  "gotune",
  "gotunu",
  "gotveren",
  "goyiim",
  "goyum",
  "goyuyim",
  "goyyim",
  "g\u00f6t",
  "g\u00f6t deli\u011fi",
  "g\u00f6telek",
  "g\u00f6t herif",
  "g\u00f6tlalesi",
  "g\u00f6tlek",
  "g\u00f6to\u011flan\u0131",
  "g\u00f6t o\u011flan\u0131",
  "g\u00f6to\u015f",
  "g\u00f6tten",
  "g\u00f6t\u00fc",
  "g\u00f6t\u00fcn",
  "g\u00f6t\u00fcne",
  "g\u00f6t\u00fcnekoyim",
  "g\u00f6t\u00fcne koyim",
  "g\u00f6t\u00fcn\u00fc",
  "g\u00f6tveren",
  "g\u00f6t veren",
  "g\u00f6t verir",
  "gtelek",
  "gtn",
  "gtnde",
  "gtnden",
  "gtne",
  "gtten",
  "gtveren",
  "hasiktir",
  "hassikome",
  "hassiktir",
  "has siktir",
  "hassittir",
  "haysiyetsiz",
  "hayvan herif",
  "ho\u015faf\u0131",
  "h\u00f6d\u00fck",
  "hsktr",
  "huur",
  "\u0131bnel\u0131k",
  "ibina",
  "ibine",
  "ibinenin",
  "ibne",
  "ibnedir",
  "ibneleri",
  "ibnelik",
  "ibnelri",
  "ibneni",
  "ibnenin",
  "ibnerator",
  "ibnesi",
  "idiot",
  "idiyot",
  "imansz",
  "ipne",
  "iserim",
  "i\u015ferim",
  "ito\u011flu it",
  "kafam girsin",
  "kafas\u0131z",
  "kafasiz",
  "kahpe",
  "kahpenin",
  "kahpenin feryad\u0131",
  "kaka",
  "kaltak",
  "kanc\u0131k",
  "kancik",
  "kappe",
  "karhane",
  "ka\u015far",
  "kavat",
  "kavatn",
  "kaypak",
  "kayyum",
  "kerane",
  "kerhane",
  "kerhanelerde",
  "kevase",
  "keva\u015fe",
  "kevvase",
  "koca g\u00f6t",
  "kodu\u011fmun",
  "kodu\u011fmunun",
  "kodumun",
  "kodumunun",
  "koduumun",
  "koyarm",
  "koyay\u0131m",
  "koyiim",
  "koyiiym",
  "koyim",
  "koyum",
  "koyyim",
  "krar",
  "kukudaym",
  "laciye boyad\u0131m",
  "lavuk",
  "libo\u015f",
  "madafaka",
  "mal",
  "malafat",
  "malak",
  "manyak",
  "mcik",
  "meme",
  "memelerini",
  "mezveleli",
  "minaamc\u0131k",
  "mincikliyim",
  "mna",
  "monakkoluyum",
  "motherfucker",
  "mudik",
  "oc",
  "ocuu",
  "ocuun",
  "O\u00c7",
  "o\u00e7",
  "o. \u00e7ocu\u011fu",
  "o\u011flan",
  "o\u011flanc\u0131",
  "o\u011flu it",
  "orosbucocuu",
  "orospu",
  "orospucocugu",
  "orospu cocugu",
  "orospu \u00e7oc",
  "orospu\u00e7ocu\u011fu",
  "orospu \u00e7ocu\u011fu",
  "orospu \u00e7ocu\u011fudur",
  "orospu \u00e7ocuklar\u0131",
  "orospudur",
  "orospular",
  "orospunun",
  "orospunun evlad\u0131",
  "orospuydu",
  "orospuyuz",
  "orostoban",
  "orostopol",
  "orrospu",
  "oruspu",
  "oruspu\u00e7ocu\u011fu",
  "oruspu \u00e7ocu\u011fu",
  "osbir",
  "ossurduum",
  "ossurmak",
  "ossuruk",
  "osur",
  "osurduu",
  "osuruk",
  "osururum",
  "otuzbir",
  "\u00f6k\u00fcz",
  "\u00f6\u015fex",
  "patlak zar",
  "penis",
  "pezevek",
  "pezeven",
  "pezeveng",
  "pezevengi",
  "pezevengin evlad\u0131",
  "pezevenk",
  "pezo",
  "pic",
  "pici",
  "picler",
  "pi\u00e7",
  "pi\u00e7in o\u011flu",
  "pi\u00e7 kurusu",
  "pi\u00e7ler",
  "pipi",
  "pipi\u015f",
  "pisliktir",
  "porno",
  "pussy",
  "pu\u015ft",
  "pu\u015fttur",
  "rahminde",
  "revizyonist",
  "s1kerim",
  "s1kerm",
  "s1krm",
  "sakso",
  "saksofon",
  "salaak",
  "salak",
  "saxo",
  "sekis",
  "serefsiz",
  "sevgi koyar\u0131m",
  "sevi\u015felim",
  "sexs",
  "s\u0131\u00e7ar\u0131m",
  "s\u0131\u00e7t\u0131\u011f\u0131m",
  "s\u0131ecem",
  "sicarsin",
  "sie",
  "sik",
  "sikdi",
  "sikdi\u011fim",
  "sike",
  "sikecem",
  "sikem",
  "siken",
  "sikenin",
  "siker",
  "sikerim",
  "sikerler",
  "sikersin",
  "sikertir",
  "sikertmek",
  "sikesen",
  "sikesicenin",
  "sikey",
  "sikeydim",
  "sikeyim",
  "sikeym",
  "siki",
  "sikicem",
  "sikici",
  "sikien",
  "sikienler",
  "sikiiim",
  "sikiiimmm",
  "sikiim",
  "sikiir",
  "sikiirken",
  "sikik",
  "sikil",
  "sikildiini",
  "sikilesice",
  "sikilmi",
  "sikilmie",
  "sikilmis",
  "sikilmi\u015f",
  "sikilsin",
  "sikim",
  "sikimde",
  "sikimden",
  "sikime",
  "sikimi",
  "sikimiin",
  "sikimin",
  "sikimle",
  "sikimsonik",
  "sikimtrak",
  "sikin",
  "sikinde",
  "sikinden",
  "sikine",
  "sikini",
  "sikip",
  "sikis",
  "sikisek",
  "sikisen",
  "sikish",
  "sikismis",
  "siki\u015f",
  "siki\u015fen",
  "siki\u015fme",
  "sikitiin",
  "sikiyim",
  "sikiym",
  "sikiyorum",
  "sikkim",
  "sikko",
  "sikleri",
  "sikleriii",
  "sikli",
  "sikm",
  "sikmek",
  "sikmem",
  "sikmiler",
  "sikmisligim",
  "siksem",
  "sikseydin",
  "sikseyidin",
  "siksin",
  "siksinbaya",
  "siksinler",
  "siksiz",
  "siksok",
  "siksz",
  "sikt",
  "sikti",
  "siktigimin",
  "siktigiminin",
  "sikti\u011fim",
  "sikti\u011fimin",
  "sikti\u011fiminin",
  "siktii",
  "siktiim",
  "siktiimin",
  "siktiiminin",
  "siktiler",
  "siktim",
  "siktim",
  "siktimin",
  "siktiminin",
  "siktir",
  "siktir et",
  "siktirgit",
  "siktir git",
  "siktirir",
  "siktiririm",
  "siktiriyor",
  "siktir lan",
  "siktirolgit",
  "siktir ol git",
  "sittimin",
  "sittir",
  "skcem",
  "skecem",
  "skem",
  "sker",
  "skerim",
  "skerm",
  "skeyim",
  "skiim",
  "skik",
  "skim",
  "skime",
  "skmek",
  "sksin",
  "sksn",
  "sksz",
  "sktiimin",
  "sktrr",
  "skyim",
  "slaleni",
  "sokam",
  "sokar\u0131m",
  "sokarim",
  "sokarm",
  "sokarmkoduumun",
  "sokay\u0131m",
  "sokaym",
  "sokiim",
  "soktu\u011fumunun",
  "sokuk",
  "sokum",
  "soku\u015f",
  "sokuyum",
  "soxum",
  "sulaleni",
  "s\u00fclaleni",
  "s\u00fclalenizi",
  "s\u00fcrt\u00fck",
  "\u015ferefsiz",
  "\u015f\u0131ll\u0131k",
  "taaklarn",
  "taaklarna",
  "tarrakimin",
  "tasak",
  "tassak",
  "ta\u015fak",
  "ta\u015f\u015fak",
  "tipini s.k",
  "tipinizi s.keyim",
  "tiyniyat",
  "toplarm",
  "topsun",
  "toto\u015f",
  "vajina",
  "vajinan\u0131",
  "veled",
  "veledizina",
  "veled i zina",
  "verdiimin",
  "weled",
  "weledizina",
  "whore",
  "xikeyim",
  "yaaraaa",
  "yalama",
  "yalar\u0131m",
  "yalarun",
  "yaraaam",
  "yarak",
  "yaraks\u0131z",
  "yaraktr",
  "yaram",
  "yaraminbasi",
  "yaramn",
  "yararmorospunun",
  "yarra",
  "yarraaaa",
  "yarraak",
  "yarraam",
  "yarraam\u0131",
  "yarragi",
  "yarragimi",
  "yarragina",
  "yarragindan",
  "yarragm",
  "yarra\u011f",
  "yarra\u011f\u0131m",
  "yarra\u011f\u0131m\u0131",
  "yarraimin",
  "yarrak",
  "yarram",
  "yarramin",
  "yarraminba\u015f\u0131",
  "yarramn",
  "yarran",
  "yarrana",
  "yarrrak",
  "yavak",
  "yav\u015f",
  "yav\u015fak",
  "yav\u015fakt\u0131r",
  "yavu\u015fak",
  "y\u0131l\u0131\u015f\u0131k",
  "yilisik",
  "yogurtlayam",
  "yo\u011furtlayam",
  "yrrak",
  "z\u0131kk\u0131m\u0131m",
  "zibidi",
  "zigsin",
  "zikeyim",
  "zikiiim",
  "zikiim",
  "zikik",
  "zikim",
  "ziksiiin",
  "ziksiin",
  "zulliyetini",
  "zviyetini",
  "allahoc",
  "allahoç",
  "allahamk",
  "allahaq",
  "0r0spuc0cu",
  "4n4n1 sk3r1m",
  "p1c",
  "@n@nı skrm",
  "evladi",
  "orsb",
  "orsbcogu",
  "amnskm",
  "anaskm",
  "mk",
  "oc",
  "abaza",
  "abazan",
  "ag",
  "a\u011fz\u0131na s\u0131\u00e7ay\u0131m",
  "fuck",
  "shit",
  "ahmak",
  "seks",
  "sex",
  "allahs\u0131z",
  "amar\u0131m",
  "ambiti",
  "am biti",
  "amc\u0131\u011f\u0131",
  "amc\u0131\u011f\u0131n",
  "amc\u0131\u011f\u0131n\u0131",
  "amc\u0131\u011f\u0131n\u0131z\u0131",
  "amc\u0131k",
  "amc\u0131k ho\u015faf\u0131",
  "amc\u0131klama",
  "amc\u0131kland\u0131",
  "amcik",
  "amck",
  "amckl",
  "amcklama",
  "amcklaryla",
  "amckta",
  "amcktan",
  "amcuk",
  "am\u0131k",
  "am\u0131na",
  "amına",
  "am\u0131nako",
  "am\u0131na koy",
  "am\u0131na koyar\u0131m",
  "am\u0131na koyay\u0131m",
  "am\u0131nakoyim",
  "am\u0131na koyyim",
  "am\u0131na s",
  "am\u0131na sikem",
  "am\u0131na sokam",
  "am\u0131n feryad\u0131",
  "am\u0131n\u0131",
  "am\u0131n\u0131 s",
  "am\u0131n oglu",
  "am\u0131no\u011flu",
  "am\u0131n o\u011flu",
  "am\u0131s\u0131na",
  "am\u0131s\u0131n\u0131",
  "amina",
  "amina g",
  "amina k",
  "aminako",
  "aminakoyarim",
  "amina koyarim",
  "amina koyay\u0131m",
  "amina koyayim",
  "aminakoyim",
  "aminda",
  "amindan",
  "amindayken",
  "amini",
  "aminiyarraaniskiim",
  "aminoglu",
  "amin oglu",
  "amiyum",
  "amk",
  "amkafa",
  "amk \u00e7ocu\u011fu",
  "amlarnzn",
  "aml\u0131",
  "amm",
  "ammak",
  "ammna",
  "amn",
  "amna",
  "amnda",
  "amndaki",
  "amngtn",
  "amnn",
  "amona",
  "amq",
  "ams\u0131z",
  "amsiz",
  "amsz",
  "amteri",
  "amugaa",
  "amu\u011fa",
  "amuna",
  "ana",
  "anaaann",
  "anal",
  "analarn",
  "anam",
  "anamla",
  "anan",
  "anana",
  "anandan",
  "anan\u0131",
  "anan\u0131",
  "anan\u0131n",
  "anan\u0131n am",
  "anan\u0131n am\u0131",
  "anan\u0131n d\u00f6l\u00fc",
  "anan\u0131nki",
  "anan\u0131sikerim",
  "anan\u0131 sikerim",
  "anan\u0131sikeyim",
  "anan\u0131 sikeyim",
  "anan\u0131z\u0131n",
  "anan\u0131z\u0131n am",
  "anani",
  "ananin",
  "ananisikerim",
  "anani sikerim",
  "ananisikeyim",
  "anani sikeyim",
  "anann",
  "ananz",
  "anas",
  "anas\u0131n\u0131",
  "anas\u0131n\u0131n am",
  "anas\u0131 orospu",
  "anasi",
  "anasinin",
  "anay",
  "anayin",
  "angut",
  "anneni",
  "annenin",
  "annesiz",
  "anuna",
  "aq",
  "a.q",
  "a.q.",
  "aq.",
  "ass",
  "atkafas\u0131",
  "atm\u0131k",
  "att\u0131rd\u0131\u011f\u0131m",
  "attrrm",
  "auzlu",
  "avrat",
  "ayklarmalrmsikerim",
  "azd\u0131m",
  "azd\u0131r",
  "azd\u0131r\u0131c\u0131",
  "babaannesi ka\u015far",
  "baban\u0131",
  "baban\u0131n",
  "babani",
  "babas\u0131 pezevenk",
  "baca\u011f\u0131na s\u0131\u00e7ay\u0131m",
  "bac\u0131na",
  "bac\u0131n\u0131",
  "bac\u0131n\u0131n",
  "bacini",
  "bacn",
  "bacndan",
  "bacy",
  "bastard",
  "basur",
  "beyinsiz",
  "b\u0131z\u0131r",
  "bitch",
  "biting",
  "boner",
  "bosalmak",
  "bo\u015falmak",
  "cenabet",
  "cibiliyetsiz",
  "cibilliyetini",
  "cibilliyetsiz",
  "cif",
  "cikar",
  "cim",
  "\u00e7\u00fck",
  "dalaks\u0131z",
  "dallama",
  "daltassak",
  "dalyarak",
  "dalyarrak",
  "dangalak",
  "dassagi",
  "diktim",
  "dildo",
  "dingil",
  "dingilini",
  "dinsiz",
  "dkerim",
  "domal",
  "domalan",
  "domald\u0131",
  "domald\u0131n",
  "domal\u0131k",
  "domal\u0131yor",
  "domalmak",
  "domalm\u0131\u015f",
  "domals\u0131n",
  "domalt",
  "domaltarak",
  "domalt\u0131p",
  "domalt\u0131r",
  "domalt\u0131r\u0131m",
  "domaltip",
  "domaltmak",
  "d\u00f6l\u00fc",
  "d\u00f6nek",
  "d\u00fcd\u00fck",
  "eben",
  "ebeni",
  "ebenin",
  "ebeninki",
  "ebleh",
  "ecdad\u0131n\u0131",
  "ecdadini",
  "embesil",
  "emi",
  "fahise",
  "fahi\u015fe",
  "feri\u015ftah",
  "ferre",
  "fuck",
  "fucker",
  "fuckin",
  "fucking",
  "gavad",
  "gavat",
  "giberim",
  "giberler",
  "gibis",
  "gibi\u015f",
  "gibmek",
  "gibtiler",
  "goddamn",
  "godo\u015f",
  "godumun",
  "gotelek",
  "gotlalesi",
  "gotlu",
  "gotten",
  "gotundeki",
  "gotunden",
  "gotune",
  "gotunu",
  "gotveren",
  "goyiim",
  "goyum",
  "goyuyim",
  "goyyim",
  "g\u00f6t",
  "g\u00f6t deli\u011fi",
  "g\u00f6telek",
  "g\u00f6t herif",
  "g\u00f6tlalesi",
  "g\u00f6tlek",
  "g\u00f6to\u011flan\u0131",
  "g\u00f6t o\u011flan\u0131",
  "g\u00f6to\u015f",
  "g\u00f6tten",
  "g\u00f6t\u00fc",
  "g\u00f6t\u00fcn",
  "g\u00f6t\u00fcne",
  "g\u00f6t\u00fcnekoyim",
  "g\u00f6t\u00fcne koyim",
  "g\u00f6t\u00fcn\u00fc",
  "g\u00f6tveren",
  "g\u00f6t veren",
  "g\u00f6t verir",
  "gtelek",
  "gtn",
  "gtnde",
  "gtnden",
  "gtne",
  "gtten",
  "gtveren",
  "hasiktir",
  "hassikome",
  "hassiktir",
  "has siktir",
  "hassittir",
  "haysiyetsiz",
  "hayvan herif",
  "ho\u015faf\u0131",
  "h\u00f6d\u00fck",
  "hsktr",
  "huur",
  "\u0131bnel\u0131k",
  "ibina",
  "ibine",
  "ibinenin",
  "ibne",
  "ibnedir",
  "ibneleri",
  "ibnelik",
  "ibnelri",
  "ibneni",
  "ibnenin",
  "ibnerator",
  "ibnesi",
  "idiot",
  "idiyot",
  "imansz",
  "ipne",
  "iserim",
  "i\u015ferim",
  "ito\u011flu it",
  "kafam girsin",
  "kafas\u0131z",
  "kafasiz",
  "kahpe",
  "kahpenin",
  "kahpenin feryad\u0131",
  "kaka",
  "kaltak",
  "kanc\u0131k",
  "kancik",
  "kappe",
  "karhane",
  "ka\u015far",
  "kavat",
  "kavatn",
  "kaypak",
  "kayyum",
  "kerane",
  "kerhane",
  "kerhanelerde",
  "kevase",
  "keva\u015fe",
  "kevvase",
  "koca g\u00f6t",
  "kodu\u011fmun",
  "kodu\u011fmunun",
  "kodumun",
  "kodumunun",
  "koduumun",
  "koyarm",
  "koyay\u0131m",
  "koyiim",
  "koyiiym",
  "koyim",
  "koyum",
  "koyyim",
  "krar",
  "kukudaym",
  "laciye boyad\u0131m",
  "libo\u015f",
  "madafaka",
  "malafat",
  "malak",
  "mcik",
  "meme",
  "memelerini",
  "mezveleli",
  "minaamc\u0131k",
  "mincikliyim",
  "mna",
  "monakkoluyum",
  "motherfucker",
  "mudik",
  "oc",
  "ocuu",
  "ocuun",
  "O\u00c7",
  "o\u00e7",
  "o. \u00e7ocu\u011fu",
  "o\u011flan",
  "o\u011flanc\u0131",
  "o\u011flu it",
  "orosbucocuu",
  "orospu",
  "orospucocugu",
  "orospu cocugu",
  "orospu \u00e7oc",
  "orospu\u00e7ocu\u011fu",
  "orospu \u00e7ocu\u011fu",
  "orospu \u00e7ocu\u011fudur",
  "orospu \u00e7ocuklar\u0131",
  "orospudur",
  "orospular",
  "orospunun",
  "orospunun evlad\u0131",
  "orospuydu",
  "orospuyuz",
  "orostoban",
  "orostopol",
  "orrospu",
  "oruspu",
  "oruspu\u00e7ocu\u011fu",
  "oruspu \u00e7ocu\u011fu",
  "osbir",
  "ossurduum",
  "ossurmak",
  "ossuruk",
  "osur",
  "osurduu",
  "osuruk",
  "osururum",
  "otuzbir",
  "\u00f6k\u00fcz",
  "\u00f6\u015fex",
  "patlak zar",
  "penis",
  "pezevek",
  "pezeven",
  "pezeveng",
  "pezevengi",
  "pezevengin evlad\u0131",
  "pezevenk",
  "pezo",
  "pic",
  "pici",
  "picler",
  "pi\u00e7",
  "pi\u00e7in o\u011flu",
  "pi\u00e7 kurusu",
  "pi\u00e7ler",
  "pipi",
  "pipi\u015f",
  "pisliktir",
  "porno",
  "pussy",
  "pu\u015ft",
  "pu\u015fttur",
  "rahminde",
  "revizyonist",
  "s1kerim",
  "s1kerm",
  "s1krm",
  "sakso",
  "saksofon",
  "saxo",
  "sekis",
  "serefsiz",
  "sevgi koyar\u0131m",
  "sevi\u015felim",
  "sexs",
  "s\u0131\u00e7ar\u0131m",
  "s\u0131\u00e7t\u0131\u011f\u0131m",
  "s\u0131ecem",
  "sicarsin",
  "sie",
  "sik",
  "sikdi",
  "sikdi\u011fim",
  "sike",
  "sikecem",
  "sikem",
  "siken",
  "sikenin",
  "siker",
  "sikerim",
  "sikerler",
  "sikersin",
  "sikertir",
  "sikertmek",
  "sikesen",
  "sikesicenin",
  "sikey",
  "sikeydim",
  "sikeyim",
  "sikeym",
  "siki",
  "sikicem",
  "sikici",
  "sikien",
  "sikienler",
  "sikiiim",
  "sikiiimmm",
  "sikiim",
  "sikiir",
  "sikiirken",
  "sikik",
  "sikil",
  "sikildiini",
  "sikilesice",
  "sikilmi",
  "sikilmie",
  "sikilmis",
  "sikilmi\u015f",
  "sikilsin",
  "sikim",
  "sikimde",
  "sikimden",
  "sikime",
  "sikimi",
  "sikimiin",
  "sikimin",
  "sikimle",
  "sikimsonik",
  "sikimtrak",
  "sikin",
  "sikinde",
  "sikinden",
  "sikine",
  "sikini",
  "sikip",
  "sikis",
  "sikisek",
  "sikisen",
  "sikish",
  "sikismis",
  "siki\u015f",
  "siki\u015fen",
  "siki\u015fme",
  "sikitiin",
  "sikiyim",
  "sikiym",
  "sikiyorum",
  "sikkim",
  "sikko",
  "sikleri",
  "sikleriii",
  "sikli",
  "sikm",
  "sikmek",
  "sikmem",
  "sikmiler",
  "sikmisligim",
  "siksem",
  "sikseydin",
  "sikseyidin",
  "siksin",
  "siksinbaya",
  "siksinler",
  "siksiz",
  "siksok",
  "siksz",
  "sikt",
  "sikti",
  "siktigimin",
  "siktigiminin",
  "sikti\u011fim",
  "sikti\u011fimin",
  "sikti\u011fiminin",
  "siktii",
  "siktiim",
  "siktiimin",
  "siktiiminin",
  "siktiler",
  "siktim",
  "siktim",
  "siktimin",
  "siktiminin",
  "siktir",
  "siktir et",
  "siktirgit",
  "siktir git",
  "siktirir",
  "siktiririm",
  "siktiriyor",
  "siktir lan",
  "siktirolgit",
  "siktir ol git",
  "sittimin",
  "sittir",
  "skcem",
  "skecem",
  "skem",
  "sker",
  "skerim",
  "skerm",
  "skeyim",
  "skiim",
  "skik",
  "skim",
  "skime",
  "skmek",
  "sksin",
  "sksn",
  "sksz",
  "sktiimin",
  "sktrr",
  "skyim",
  "slaleni",
  "sokam",
  "sokar\u0131m",
  "sokarim",
  "sokarm",
  "sokarmkoduumun",
  "sokay\u0131m",
  "sokaym",
  "sokiim",
  "soktu\u011fumunun",
  "sokuk",
  "sokum",
  "soku\u015f",
  "sokuyum",
  "soxum",
  "sulaleni",
  "s\u00fclaleni",
  "s\u00fclalenizi",
  "s\u00fcrt\u00fck",
  "\u015ferefsiz",
  "\u015f\u0131ll\u0131k",
  "taaklarn",
  "taaklarna",
  "tarrakimin",
  "tasak",
  "tassak",
  "ta\u015fak",
  "ta\u015f\u015fak",
  "tipini s.k",
  "tipinizi s.keyim",
  "tiyniyat",
  "toplarm",
  "topsun",
  "toto\u015f",
  "vajina",
  "vajinan\u0131",
  "veled",
  "veledizina",
  "veled i zina",
  "verdiimin",
  "weled",
  "weledizina",
  "whore",
  "xikeyim",
  "yaaraaa",
  "yalama",
  "yalar\u0131m",
  "yalarun",
  "yaraaam",
  "yarak",
  "yaraks\u0131z",
  "yaraktr",
  "yaram",
  "yaraminbasi",
  "yaramn",
  "yararmorospunun",
  "yarra",
  "yarraaaa",
  "yarraak",
  "yarraam",
  "yarraam\u0131",
  "yarragi",
  "yarragimi",
  "yarragina",
  "yarragindan",
  "yarragm",
  "yarra\u011f",
  "yarra\u011f\u0131m",
  "yarra\u011f\u0131m\u0131",
  "yarraimin",
  "yarrak",
  "yarram",
  "yarramin",
  "yarraminba\u015f\u0131",
  "yarramn",
  "yarran",
  "yarrana",
  "yarrrak",
  "yavak",
  "yav\u015f",
  "yav\u015fak",
  "yav\u015fakt\u0131r",
  "yavu\u015fak",
  "y\u0131l\u0131\u015f\u0131k",
  "yilisik",
  "yogurtlayam",
  "yo\u011furtlayam",
  "yrrak",
  "z\u0131kk\u0131m\u0131m",
  "zibidi",
  "zigsin",
  "zikeyim",
  "zikiiim",
  "zikiim",
  "zikik",
  "zikim",
  "ziksiiin",
  "ziksiin",
  "zulliyetini",
  "zviyetini",
];

client.on("messageUpdate", async (old, nev) => {
  if (old.content != nev.content) {
    let i = await db.fetch(`küfür.${nev.member.guild.id}.durum`);
    let y = await db.fetch(`küfür.${nev.member.guild.id}.kanal`);
    if (i) {
      if (küfür.some((word) => nev.content.includes(word))) {
        if (nev.member.hasPermission("BAN_MEMBERS")) return;
        //if (ayarlar.gelistiriciler.includes(nev.author.id)) return ;
        const embed = new Discord.MessageEmbed()
          .setColor("#ff7e00")
          .setDescription(
            `${nev.author} , **Ben varken küfürmü emteye çalıştın?**`
          )
          .addField("Küfür:", nev);

        nev.delete();
        const embeds = new Discord.MessageEmbed()
          .setColor("#ff7e00")
          .setDescription(`${nev.author} , **Mesajı editle küfür etmekmi?**`);
        client.channels.cache.get(y).send(embed);
        nev.channel.send(embeds).then((msg) =>
          msg.delete({
            timeout: 5000,
          })
        );
      }
    } else {
    }
    if (!i) return;
  }
});

client.on("message", async (msg) => {
  if (msg.author.bot) return;
  if (msg.channel.type === "dm") return;
  let y = await db.fetch(`küfür.${msg.member.guild.id}.kanal`);

  let i = await db.fetch(`küfür.${msg.member.guild.id}.durum`);
  if (i) {
    if (küfür.some((word) => msg.content.toLowerCase().includes(word))) {
      try {
        if (!msg.member.hasPermission("MANAGE_GUILD")) {
          //  if (!ayarlar.gelistiriciler.includes(msg.author.id)) return ;
          msg.delete({
            timeout: 750,
          });
          const embeds = new Discord.MessageEmbed()
            .setColor("#ff7e00")
            .setDescription(
              `<@${msg.author.id}> , **Küfür etmeye çalıştı ama ben varken asla!**`
            );
          msg.channel.send(embeds).then((msg) =>
            msg.delete({
              timeout: 5000,
            })
          );
          const embed = new Discord.MessageEmbed()
            .setColor("#ff7e00")
            .setDescription(
              `${msg.author} , **Küfür etmeye çalıştı ama ben varken asla!**`
            )
            .addField("Mesajı:", msg);
          client.channels.cache.get(y).send(embed);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (!i) return;
});
