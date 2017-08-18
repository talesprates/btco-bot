const request = require('request');
const variables = require('../../../variables');
// const cheerio = require('cheerio');
const Maps = require('../../../Maps');

(() => {
  /* eslint global-require: 0 */
  function serverTrack(message, callback) {
    const bf4servers = variables.BF4_SERVER_LIST;
    Promise.all(bf4servers.map(server => getServerStatus(server)))
      .then((serversInfo) => {
        callback(serversInfo.join('\n'));
      })
      .catch((error) => {
        callback('error retrieving server info', error);
      });
  }

  function getServerStatus(server) {
    return new Promise((resolve, reject) => {
      const { serverId, serverName } = server;
      request(`http://battlelog.battlefield.com/bf4/servers/show/pc/${serverId}/?json=1`, (error, response) => {
        const parsedBody = JSON.parse(response.body);
        if (error || parsedBody.message === 'SERVER_INFO_NOT_FOUND') {
          reject(error);
        }

        const serverInfo = parsedBody.message.SERVER_INFO;
        const name = serverName;
        const currentPlayers = serverInfo.slots['2'].current;
        const maxPlayers = serverInfo.slots['2'].max;
        const playersQueue = serverInfo.slots['1'].current;
        const map = getMapName(serverInfo.map);

        const serverMessage = [];
        const serverPlayers = parsedBody.message.SERVER_PLAYERS;

        serverMessage.push(`***[${name.substring(0, 4)}]***`);
        serverMessage.push(`\t**players:** ${currentPlayers}/${maxPlayers} (${playersQueue})`);
        serverMessage.push(`\t**map**: ${map}`);
        generateServerMessage(serverMessage, serverPlayers)
          .then(message => resolve(message))
          .catch(() => reject);
      });
    });
  }

  function generateServerMessage(serverMessage, serverPlayers) {
    return new Promise((resolve) => {
      variables.TRACKED_PLAYERS.forEach((personaId) => {
        serverPlayers.some((player) => {
          if (player.personaId === personaId) {
            serverMessage.push(`\t\t${player.persona.personaName}`);
            return true;
          }
          return false;
        });
      });
      resolve(serverMessage.join('\n'));
    });
  }

  function getMapName(name) {
    let displayName = name;

    Maps.bf4maps.some((server) => {
      if (server.raw === name) {
        displayName = server.displayName;
        return true;
      }
      return false;
    });

    return displayName;
  }

  module.exports = {
    pattern: /^!servers(?: (.*))?$/,
    handler: serverTrack,
    description: '**!servers** [bf4|bfhl]: show the tracked serverlist info'
  };
})();
