const Discord = require('discord.js');
const variables = require('../../variables');
const client = new Discord.Client();
const commands = require('./commands/parseCommand');

module.exports = {
  client
};

client.login(variables.DISCORD_BOT_TOKEN);

client.on('ready', () => {
  console.log(`btco-bot logged as ${client.user.tag}!`);
});

client.on('message', msg => {
  commands.parse(msg, (response) => {
    if (response) {
      client.channels.forEach((channel) => {
        if (channel.name == 'chat') {
          console.log('response', response);
          channel.send(response);
        };
        return;
      });
    }
  });
});

