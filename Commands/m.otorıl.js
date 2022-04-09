const Discord = require("discord.js");
const db = require('quick.db')
exports.run = async(client, message, args) => {
    let kanal = message.mentions.channels.first()
    let rol = message.mentions.roles.first()
    if(!kanal) return message.channel.send('Lütfen Bir kanal etiketle.')// Yazıyı Kendinize göre ayarlayın
    if(!rol) return message.channel.send('Lütfen Bir rol etiketle.')// Yazıyı Kendinize göre ayarlayın
    

    db.set(`otorol_${message.guild.id}`,rol.id)
    db.set(`otokanal_${message.guild.id}`,kanal.id)

    message.channel.send('Otorol,  <#'+ kanal + '> | <@&' + rol +'> Şeklinde ayarlandı')// Yazıyı Kendinize göre ayarlayın
};


exports.conf = {
    aliases: []
  };

exports.help = {
    name: 'otorol'
  };