const variables = require('../../../variables');
const { overview, persona } = require('../../battlelog/');

module.exports = {
  pattern: /^!overview(?: (.*))?$/,
  handler: overviewTrack,
  description: '**!weapon** [gun]: show the tracked players weapon kills'
};

function overviewTrack(message, callback) {
  const trackedPlayers = variables.TRACKED_PLAYERS;
  Promise.all(trackedPlayers.map(personaId => getOverview(personaId)))
    .then(generateServerMessage)
    .then(serverMessage => callback(serverMessage.join('\n')))
    .catch(error => callback(`error retrieving weapon info (${error})`));
}

function getOverview(personaId) {
  return new Promise((resolve, reject) => {
    persona.getPersona(personaId)
      .then((playerPersona) => {
        overview.getOverview(personaId)
          .then(overviewData => resolve(
            {
              name: playerPersona.personaName,
              overview: overviewData
            }))
          .catch(reject);
      });
  });
}

function generateServerMessage(overviewsData) {
  return new Promise((resolve) => {
    const serverMessage = [];
    const sortedPlayersOverviews = overviewsData
      .sort((playerA, playerB) =>
        playerB.overview.overviewStats.skill - playerA.overview.overviewStats.skill);

    sortedPlayersOverviews.forEach((player, index) => {
      const name = player.name;
      const overviewStats = player.overview.overviewStats;
      const time = `${Math.floor(overviewStats.timePlayed / 3600, 0)}h`;
      serverMessage.push(`${index + 1}. **${name}**`);
      serverMessage.push(`\t**skill**: ${overviewStats.skill} - **kd** ${overviewStats.kdRatio} **time** ${time}`);
    });

    resolve(serverMessage);
  });
}
