const request = require('request');
const variables = require('../../../variables');
const Maps = require('../../../Maps');

module.exports = {
  pattern: /^!servers(?: (.*))?$/,
  handler: serverTrack,
  description: '**!servers** [link]: show the tracked serverlist info or link'
};

/* eslint global-require: 0 */
function serverTrack(message, callback, link) {
  const bf4servers = variables.BF4_SERVER_LIST;
  Promise.all(bf4servers.map((server) => {
    let serverMessage;
    if (link === 'link') {
      serverMessage = getServerLinks(server);
    } else {
      serverMessage = getServerStatus(server);
    }

    return serverMessage;
  }))
  .then(serversInfo => callback(serversInfo.join('\n')))
  .catch(error => callback(`error retrieving server info (${error})`));
}

function getServerLinks(server) {
  return new Promise((resolve, reject) => {
    const { serverId, serverName } = server;
    request(`http://battlelog.battlefield.com/bf4/servers/show/pc/${serverId}/?json=1`, (error, response) => {
      const parsedBody = JSON.parse(response.body);
      if (error || parsedBody.message === 'SERVER_INFO_NOT_FOUND') {
        reject(`${serverId} ${serverName}`);
      } else {
        const name = serverName;
        const serverMessage = [];

        serverMessage.push(`***[${name.substring(0, 4)}]***`);
        serverMessage.push(`\t**link:** <http://battlelog.battlefield.com/bf4/servers/show/pc/${serverId}/>`);
        resolve(serverMessage.join('\n'));
      }
    });
  });
}

function getServerStatus(server) {
  return new Promise((resolve, reject) => {
    const { serverId, serverName } = server;
    request(`http://battlelog.battlefield.com/bf4/servers/show/pc/${serverId}/?json=1`, (error, response) => {
      const parsedBody = JSON.parse(response.body);
      if (error || parsedBody.message === 'SERVER_INFO_NOT_FOUND') {
        reject(`${serverId} ${serverName}`);
      } else {
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
          .then(resolve)
          .catch(reject);
      }
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
