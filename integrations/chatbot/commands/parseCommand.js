const commands = require('./commands');

module.exports = {
  parse
};

function parse(message, callback) {
  if (message.content.charAt(0) !== '!') {
    return false;
  }

  const parsed = commands.some((command) => {
    const match = message.content.match(command.pattern);

    if (match) {
      const params = [message, callback];

      params.push(...match.slice(1));
      command.handler(...params);

      return true;
    }

    return false;
  });

  if (!parsed) {
    callback('invalid command. type **!help** for the command list');
    return false;
  }

  return false;
}
