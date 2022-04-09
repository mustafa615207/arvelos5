const Discord = require('discord.js')

    exports.run = (client, message, args) => {
        // Yetkin Yok Kodu
        if(!message.member.roles.cache.has("959042275332194382")){
            const Pâyidar = new Discord.MessageEmbed()
            .setDescription(`Bu komudu kullanmak için gerekli yetkilere sahip değilsin.`)
            .setColor('BLACK')
            .setFooter('ℵ Arvelos')
            return message.channel.send(Pâyidar)
        }

        // Let Tanımları
        let miktar = args[0]
        
        // Hata Mesajları
        if(miktar > 100){
            const Pâyidar = new Discord.MessageEmbed()
            .setDescription(`${message.author} - **En Fazla \`100\` Mesaj Silebilirim**`)
            .setColor('BLACK')
            .setFooter('ℵ Arvelos')
            return message.channel.send(Pâyidar)
        }
        if(!miktar){
            const Pâyidar = new Discord.MessageEmbed()
            .setDescription(`${message.author} - **Lütfen Silinecek Mesaj Sayısını Gir.**`)
            .setColor('BLACK')
            .setFooter('ℵ Arvelos')
            return message.channel.send(Pâyidar)
        }
        if(isNaN(miktar)){
            const Pâyidar = new Discord.MessageEmbed()
            .setDescription(`${message.author} - **Harf Değil, Rakam Giriceksin.**`)
            .setColor('BLACK')
            .setFooter('ℵ Arvelos')
            return message.channel.send(Pâyidar)
        }

        // Sil
        if(miktar){
            message.channel.bulkDelete(miktar)
            
            const Pâyidar = new Discord.MessageEmbed()
            .setDescription(`${message.author} - **Başarıyla ${miktar} Adet Mesaj Sildim**`)
            .setColor('BLACK')
            .setFooter('ℵ Arvelos')
            return message.channel.send(Pâyidar).then(payidar => {
                payidar.delete({timeout: 50000})
            })
        }
    }

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['Temizle','Sil','SİL','sil','TEMİZLE']
}

exports.help = {
    name: 'temizle'
}