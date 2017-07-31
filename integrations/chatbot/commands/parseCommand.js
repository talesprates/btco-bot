const commands = require('./commands');

module.exports = { 
  parse
};

 /* eslint global-require: 0 */
function parse(message, callback) {
  if (message.content.charAt(0) !== '!') {
    return false;
  }
  
  const parsed = commands.some((command) => {
    let match;

    match = message.content.match(command.pattern);
    
    if (match) {
      const params = [message];
      console.log(match);
      params.push(...match.slice(1));

      const replyMsg = command.handler(...params);
      
      console.log('replyMsg', replyMsg);

      callback(replyMsg);
      return true;
    } else {
      return false;
    }
  });

  if (!parsed) {
    return false;
  }
}