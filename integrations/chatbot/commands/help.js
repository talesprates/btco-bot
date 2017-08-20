module.exports = {
  pattern: /^!help$/,
  handler: help,
  description: '**!help** : shows a list of valid commands',
};

/* eslint global-require: 0 */
function help(message, callback) {
  let helpText = 'commandlist: \n';
  const commands = require('./commands');

  commands.forEach((command) => {
    helpText += `${command.description}\n`;
  });

  callback(helpText);
}
