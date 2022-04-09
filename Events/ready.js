const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
console.log(`Logged in as ${client.user.tag}!`);
console.log("ℵ Arvelos")

client.user.setActivity(`ℵ Arvelos`, {
type: "STREAMING",
url: "https://www.twitch.tv/deadyilmaz"})
    .then(presence => console.log(`BOTUN AKTİF  ${presence.game ? presence.game.none : 'dostum'}`))
    .catch(console.error);
});

client.login('OTYwMTMxMTIxMDA0MzE0NjY1.Ykl9yQ.H29mh3UfznjQmu5Gssj9irL_YH4');