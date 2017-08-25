const variables = require('../../../variables');
const serverInfo = require('../../battlelog/server-info');
const serverSnapshot = require('../../battlelog/server-snapshot');

module.exports = {
  pattern: /^!servers(?: (.*))?$/,
  handler: serverTrack,
  description: '**!servers** [link]: show the tracked serverlist info or link'
};

function serverTrack(message, callback) {
  const bf4servers = variables.BF4_SERVER_LIST;
  Promise.all(bf4servers.map(server => getMessage(server)))
    .then(serverMessage => callback(serverMessage.join('\n')))
    .catch(error => callback(`error retrieving server info (${error})`));
}

function getMessage(server) {
  return new Promise((resolve) => {
    serverInfo.getServerStatus(server)
      .then((serverStatus) => {
        serverSnapshot.getServerTeams(server)
          .then(serverTeams => resolve(generateServerMessage(serverStatus, serverTeams)));
      });
  });
}

function generateServerMessage(serverStatus, serverTeams) {
  return new Promise((resolve) => {
    const serverMessage = [];
    const { name, currentPlayers, maxPlayers, playersQueue, map } = serverStatus;
    const { alphaTeam, bravoTeam, ticketsMax } = serverTeams;
    const serverPlayers = alphaTeam.players.concat(bravoTeam.players)
      .sort((playerA, playerB) => playerB.tag.localeCompare(playerA.tag));

    serverMessage.push(`***[${name.substring(0, 4)}]***`);
    serverMessage.push(`\t**players:** ${currentPlayers}/${maxPlayers} (${playersQueue})`);
    serverMessage.push(`\t**map**: ${map}`);
    serverMessage.push(`\t**tickets**: ${alphaTeam.tickets}/${bravoTeam.tickets}/${ticketsMax}`);

    variables.TRACKED_PLAYERS.forEach((personaId) => {
      serverPlayers.some((player) => {
        if (player.personaId === personaId) {
          serverMessage.push(player.tag.length ? `\t\t[${player.tag}] ${player.name}` : `\t\t${player.name}`);
          return true;
        }
        return false;
      });
    });
    resolve(serverMessage.join('\n'));
  });
}
