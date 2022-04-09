const Discord = require('discord.js')
const Settings = require('../Settings/Settings.json')
    exports.run = (client, message, args) => {
        // Yetki
        if(!message.member.roles.cache.some(role => (role.name === 'Ban spear'))){
            const ℵArvelos = new Discord.MessageEmbed()
            .setDescription(`Bu komudu kullanmak için gerekli yetkilere sahip olman gerek.`)
            .setColor('BLACK')
            .setFooter('ℵ Arvelos')
            return message.channel.send(ℵArvelos)
        }

        // Let Tanımları
        let kullanıcı = message.guild.member(message.guild.members.cache.get(args[0])) || message.mentions.members.first();        let sebep = args.slice(1).join(' ');
        let guild = message.guild;

        // Özel Zaman
        let zaman = new Date()
        let cmfzaman = zaman.getFullYear() + "." + (zaman.getMonth() +1) + "." + zaman.getDate() + " (\`" + zaman.getHours() + ":" + zaman.getMinutes() + ":" + zaman.getSeconds() + "\`)";

        if(!kullanıcı){
            const ℵArvelos = new Discord.MessageEmbed()
            .setDescription(`${message.author} - **Lütfen Kullanıcı Belirt**`)
            .setColor('BLACK')
            .setFooter('ℵ Arvelos')
            return message.channel.send(ℵArvelos)
        } else if(isNaN(kullanıcı)){
            const ℵArvelos = new Discord.MessageEmbed()
            .setDescription(`${message.author} - **Lütfen Geçerli Kullanıcı Belirt**`)
            .setColor('BLACK')
            .setFooter('ℵ Arvelos')
            return message.channel.send(ℵArvelos)
        }
        if(!sebep){
            const ℵArvelos = new Discord.MessageEmbed()
            .setDescription(`${message.author} - **Lütfen Sebep Belirt**`)
            .setColor('BLACK')
            .setFooter('ℵ Arvelos')
            return message.channel.send(ℵArvelos)
        }

        if(kullanıcı && sebep){
            // Ban İşlemi
            kullanıcı.ban({reason: sebep})

            // Mesaj
            const ℵArvelos = new Discord.MessageEmbed()
            
            .setDescription(`
                \` ˑ \`Banlanan Üye - **${kullanıcı}(\`${kullanıcı.id}\`)**
                \` ˑ \`Banlayan Yetkili - **${message.author}(\`${message.author.id}\`)**
                \` ˑ \`Ban Nedeni - **${sebep}**
            `)
            
            .setColor('BLACK')
            .setFooter('ℵ Arvelos | ' + cmfzaman)
            .setImage("https://media2.giphy.com/media/P4bLhbzfxDaM0/giphy.gif?cid=790b7611927a1206a32a987fa98e88a78b2a26dcabe41fd6&rid=giphy.gif");
            message.channel.send(ℵArvelos)
        }
    }

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['Ban','BAN','YASAKLA','Yasakla','yasakla'],
    permLevel: 0
}

exports.help = {
    name: 'ban'
}