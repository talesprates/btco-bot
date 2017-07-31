const request = require('request');
const variables = require('../../../variables');

(() => {
  /* eslint global-require: 0 */
  function serverTrack(message, callback, serverName) {
    let replyMsg;
    const asqd = '3b513dc3-fe79-4c06-8696-4719c4e8a860'
    request(`http://battlelog.battlefield.com/bf4/servers/show/pc/${asqd}/?json=1`, (error, response) => {
      if (error) {
        callback();
        return;
      }
      
      const parsedBody = JSON.parse(response.body);
      const serverInfo = parsedBody.message.SERVER_INFO;
      const name =  serverInfo.name;
      const currentPlayers = serverInfo.slots["2"].current; 
      const maxPlayers = serverInfo.slots["2"].max;
      const playersQueue = serverInfo.slots["1"].current;
      const map = serverInfo.map;
      callback(`${name} ${currentPlayers}/${maxPlayers} (${playersQueue}) | ${map}`);
      return;
    });
  }

  module.exports = {
    pattern: /^!servers(?: (.*))?$/,
    handler: serverTrack,
    description: '!servers [serverName]'
  };
})();