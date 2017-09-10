const { BF4_SERVER_LIST, TRACKED_PLAYERS } = require('../../../variables');
const { serverSnapshot } = require('../../battlelog');

module.exports = {
  pattern: /^!servers(?: (.*))?$/,
  handler: serverTrack,
  description: '**!servers** [link]: show the tracked serverlist info or link'
};


function serverTrack(message, callback) {
  Promise.all(BF4_SERVER_LIST.map(serverSnapshot.getServerSnapshot))
    .then(snapshots => generateResponseMessage(snapshots, BF4_SERVER_LIST))
    .then(callback)
    .catch(error => callback(`error retrieving server info (${error})`));
}

function generateResponseMessage(snapshots, servers) {
  return new Promise((resolve) => {
    const serverMessage = snapshots.map((snapshot, index) => {
      const [alphaTeam, bravoTeam] = snapshot.teamInfo;

      let message = `***[${servers[index].serverName.substring(0, 4)}]***`;
      message += `\n\t**players:** ${snapshot.getOnlinePlayers()}/${snapshot.maxPlayers} (${snapshot.waitingPlayers})`;
      message += `\n\t**map**: ${snapshot.getMapName()}`;
      message += `\n\t**tickets**: ${alphaTeam.getFlag()} ${alphaTeam.tickets}/${bravoTeam.tickets} ${bravoTeam.getFlag()}`;
      message += `\n\t**total tickets**: ${bravoTeam.ticketsMax}`;

      TRACKED_PLAYERS.forEach((personaId) => {
        if (alphaTeam.players[personaId] || bravoTeam.players[personaId]) {
          const player = alphaTeam.players[personaId] || bravoTeam.players[personaId];
          message += player.tag.length ? `\n\t\t[${player.tag}] ${player.name}` : `\n\t\t${player.name}`;
        }
      });
      return message;
    });

    resolve(serverMessage);
  });
}
