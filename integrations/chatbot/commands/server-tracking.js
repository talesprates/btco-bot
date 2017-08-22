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
    if (link === 'link') {
      return getServerLinks(server);
    }

    return getServerStatus(server)
      .then(serverStatus => generateServerMessage(serverStatus));
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
        const serverStatus =
          {
            name: serverName,
            currentPlayers: serverInfo.slots['2'].current,
            maxPlayers: serverInfo.slots['2'].max,
            playersQueue: serverInfo.slots['1'].current,
            map: getMapName(serverInfo.map)
          };
        getPlayersStatus(server)
          .then((playersStatus) => {
            serverStatus.playersStatus = playersStatus;
            resolve(serverStatus);
          })
          .catch(reject);
      }
    });
  });
}

function getPlayersStatus(server) {
  const { serverId, serverName } = server;
  return new Promise((resolve, reject) => {
    request(`http://keeper.battlelog.com/snapshot/${serverId}`, (error, response) => {
      const parsedBody = JSON.parse(response.body);
      if (error || parsedBody === 'No such game') {
        reject(`${serverId} ${serverName}`);
      } else {
        const serverSnapshot = parsedBody.snapshot;
        const alphaTeamTickets = serverSnapshot.conquest['1'].tickets;
        const bravoTeamTickets = serverSnapshot.conquest['2'].tickets;
        const maxTickets = serverSnapshot.conquest['1'].ticketsMax;
        const alphaTeamPlayers = [];
        const bravoTeamPlayers = [];
        Object.keys(serverSnapshot.teamInfo['1'].players).forEach((personaId) => {
          const player = serverSnapshot.teamInfo['1'].players[personaId];
          player.personaId = personaId;
          alphaTeamPlayers.push(player);
        });
        Object.keys(serverSnapshot.teamInfo['2'].players).forEach((personaId) => {
          const player = serverSnapshot.teamInfo['2'].players[personaId];
          player.personaId = personaId;
          bravoTeamPlayers.push(player);
        });
        const playersStatus =
          {
            alphaTeam: { tickets: alphaTeamTickets, players: alphaTeamPlayers },
            bravoTeam: { tickets: bravoTeamTickets, players: bravoTeamPlayers },
            maxTickets,
          };
        resolve(playersStatus);
      }
    });
  });
}

function generateServerMessage(serverStatus) {
  return new Promise((resolve) => {
    const serverMessage = [];
    const { name, currentPlayers, maxPlayers, playersQueue, map } = serverStatus;
    const alphaTeam = serverStatus.playersStatus.alphaTeam;
    const bravoTeam = serverStatus.playersStatus.bravoTeam;
    const maxTickets = serverStatus.playersStatus.maxTickets;
    serverMessage.push(`***[${name.substring(0, 4)}]***`);
    serverMessage.push(`\t**players:** ${currentPlayers}/${maxPlayers} (${playersQueue})`);
    serverMessage.push(`\t**map**: ${map}`);
    serverMessage.push(`\t**tickets**: ${alphaTeam.tickets}/${bravoTeam.tickets}/${maxTickets}`);
    const serverPlayers = alphaTeam.players.concat(bravoTeam.players);
    variables.TRACKED_PLAYERS.forEach((personaId) => {
      serverPlayers.some((player) => {
        if (player.personaId === personaId) {
          if (player.tag.length) {
            serverMessage.push(`\t\t[${player.tag}] ${player.name}`);
          } else {
            serverMessage.push(`\t\t${player.name}`);
          }
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
