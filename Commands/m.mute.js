const Discord = require('discord.js')
const ms = require('ms')

    exports.run = async(client, message, args) => {
 
        if(!message.member.roles.cache.has("959042275332194382")){
            const yetkiyok = new Discord.MessageEmbed()
            .setDescription(`${message.author} **Bu kodu kullanmak için gerekli yetkiye sahip değilsin.**`)
            .setColor('#ff0000')
            return message.channel.send(yetkiyok)
        }
 
        let kullanıcı = message.mentions.members.first();
        let sure = args[1];
        let sebep = args.slice(2).join(' ')

        if(!kullanıcı){
            const cmfhata = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setDescription(`**Lütfen Kullanıcı Belirt.**`)
            return message.channel.send(cmfhata)
        }

        if(!sure){
            const cmfhata = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setDescription(`**Lütfen Süre Belirt. Aşşağıda Tanımları Var** \n\n **S = Saniye && M = Dakika && H = Saat && D = Gün**`)
            return message.channel.send(cmfhata)
        }

        if(!sebep){
            const cmfhata = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setDescription(`**Lütfen Sebep Belirt**`)
            return message.channel.send(cmfhata)
        }
     
        if(kullanıcı && sure && sebep){
            const cmfmute = new Discord.MessageEmbed()
            .setColor('#00ff00')
            .setDescription(`${kullanıcı} Kişisine ${message.author} Tarafından **${sebep}** Sebebi İle **${sure.replace(/s/, ' Saniye').replace(/m/, ' Dakika').replace(/h/, ' Saat').replace(/d/, ' Gün')}** Süresince Mute Atıldı.\n Mute yiyen herhangi biri mute suresi bitene kadar mutesi alınmaz!! \n**__Lütfen Süre Belirt.__**\n Aşşağıda Tanımları Var

|S = Saniye | M = Dakika | H = Saat | D = Gün|`)
            .setFooter(kullanıcı.user.username + " Umarız Hatalarını Birdaha Tekrarlamazsın...")
            .setThumbnail(kullanıcı.user.avatarURL({dynamic: true, size: 2048}))
            message.channel.send(cmfmute)

            // Mute Atıldığında Verilecek & Alınacak Roller
            kullanıcı.roles.add('959042275315425290')
            kullanıcı.roles.remove('ÜYE ROL İD')

            // Mute Bittiğinde Verilecek & Alınacak Roller
            setTimeout(() => {
                kullanıcı.roles.remove('959042275315425290')
                kullanıcı.roles.add('ÜYE ROL İD')

                const mutebitti = new Discord.MessageEmbed()
                .setColor('#00ff00')
                .setDescription(`**${kullanıcı} Kişisinin Mute Süresi Doldu. Sohbete Tekrardan Hoşgeldin** :tada:`)
                message.channel.send(mutebitti)
            }, ms(sure))

        }

    } //

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['Mute','MUTE','sustur','Sustur','SUSTUR'],
    permLevel: 0
}

exports.help = {
    name: 'mute'
}