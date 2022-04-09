const Discord = require('discord.js');
const db = require("orio.db")

exports.run = (client, message, args) => {

  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(`Bu komutu kullanabilmek için **Mesajları Yönet** iznine sahip olmalısın!`);

// Veriler - Başlangıç
  let user = message.mentions.members.first();
  let reason = args.slice(1).join(' ');
  let warn = db.get(`uyarılar_${user.id}`)
  let log = message.guild.channels.cache.get("ID")// Log'un Gideceği Kanal.
  let u1 = "ID"// 1. Uyarıda Vericek Rolün ID'i.
  let u2 = "ID"// 2. Uyarıda Vericek Rolün ID'i.
  let u3 = "ID"// 3. Uyarıda Vericek Rolün ID'i.
// Veriler - Bitiş

// Uyarılar - Başlangıç
  if (!user) return message.reply('Uyaracağın kişiyi etiketlemelisin!');
  if (!reason) return message.reply('Uyarma sebebini yazmalısın!');
  if (user.id === message.author.id) return message.reply('Kendini uyaramazsın!');
  if (message.guild.members.cache.get(user.id).roles.highest.position > message.member.roles.highest.position) return message.channel.send(`Bu kişinin \`rolü/rolleri\` senin \`rolün/rollerinden\` daha yüksek.`)
// Uyarılar - Bitiş

// Log - Mesaj
  const embed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .addField('Yapılan İşlem', 'Uyarma')
  .addField('Kullanıcı', `${user.tag} (${user.id})`)
  .addField('Yetkili', `${message.author.tag}`)
  .addField('Sebep', reason)
  log.send(embed);
  // Log - Mesaj

// Başarılı - Mesaj
  message.guild.members.cache.get(user.id).send(`<@${user.id}>, \n**${message.guild.name}** adlı sunucuda **${reason}** sebebi ile uyarıldın! \nKuralları çiğnemeye devam eder isen susturulabilir, atılabilir veya yasaklanabilirsin!`)
  const embed2 = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setTitle("Başarılı!")
  .setDescription(`<@${user.id}> adlı kullanıcı **${reason}** sebebi ile uyarıldı ve başarıyla rolü verildi!`)
  message.channel.send(embed2)
  db.add(`uyarılar_${user.id}`, 1)
 // Başarılı - Mesaj

// Uyarı Rolü - Başlangıç
if (warn === null) {
user.roles.add(u1);
}
// Uyarı 2 Rol
if (warn === 1) {
user.roles.add(u2);
}
// Uyarı 3 Rol
if (warn === 2) {
user.roles.set([u3])// Tüm Rolleri Alır ve U3 Rolünü Verir!
}
// Uyarı Rolü - Bitiş

};
exports.conf = {
  aliases: ["warn", "uyarı-ver"]
};

exports.help = {
  name: 'Uyar'
};