const request = require('request');

module.exports = {
  getServerSnapshot,
  getServerTeams
};

function getServerSnapshot(server) {
  const { serverId, serverName } = server;
  return new Promise((resolve, reject) => {
    request(`http://keeper.battlelog.com/snapshot/${serverId}`, (error, response) => {
      const parsedBody = JSON.parse(response.body);
      if (error || parsedBody === 'No such game') {
        reject(`${serverId} ${serverName}`);
      } else {
        resolve(parsedBody.snapshot);
      }
    });
  });
}

function getServerTeams(server) {
  return new Promise((resolve, reject) => {
    getServerSnapshot(server)
      .then((snapshot) => {
        const alphaTeam = getServerTeam(snapshot, '1');
        const bravoTeam = getServerTeam(snapshot, '2');
        const playersStatus =
          {
            alphaTeam,
            bravoTeam,
            ticketsMax: alphaTeam.ticketsMax,
          };
        resolve(playersStatus);
      })
      .catch(reject);
  });
}

function getServerTeam(serverSnapshot, team) {
  const { conquest, teamInfo } = serverSnapshot;
  const players = [];
  const playersInfo = teamInfo[team].players;
  const tickets = conquest ? conquest[team].tickets : 0;
  const ticketsMax = conquest ? conquest[team].ticketsMax : 0;

  Object.keys(playersInfo).forEach((personaId) => {
    const player = playersInfo[personaId];
    player.personaId = personaId;
    players.push(player);
  });

  return {
    tickets,
    ticketsMax,
    players
  };
}
