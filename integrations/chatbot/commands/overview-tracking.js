const variables = require('../../../variables');
const { overview, persona } = require('../../battlelog/');

module.exports = {
  pattern: /^!overview(?: (.*))?$/,
  handler: overviewTrack,
  description: '**!overview**: show the tracked players overview stats'
};

function overviewTrack(message, callback) {
  const trackedPlayers = variables.TRACKED_PLAYERS;
  Promise.all(trackedPlayers.map(personaId => getOverview(personaId)))
    .then(generateServerMessage)
    .then(serverMessage => callback(serverMessage.join('\n')))
    .catch(error => callback(`error retrieving player overview (${error})`));
}

function getOverview(personaId) {
  return typeof (personaId) === 'string' ? getSingleOverview(personaId) : getMultipleOverviews(personaId);
}

function getSingleOverview(personaId) {
  return new Promise((resolve, reject) => {
    persona.getPersona(personaId)
      .then((playerPersona) => {
        overview.getOverview(personaId)
          .then(overviewData => resolve(
            {
              name: playerPersona.personaName,
              skill: overviewData.overviewStats.skill,
              kdRatio: overviewData.overviewStats.kdRatio,
              timePlayed: overviewData.overviewStats.timePlayed
            }))
          .catch(reject);
      });
  });
}

function getMultipleOverviews(personaList) {
  return new Promise((resolve, reject) =>
    Promise.all(personaList.map(getSingleOverview))
      .then((overviewList) => {
        const reducedPersonaList = overviewList.reduce((p1, p2) => {
          p2.name = p1.name;
          p2.skill = p1.skill;
          p2.timePlayed += p1.timePlayed;
          p2.kdRatio += p1.kdRatio;
          return p2;
        });
        reducedPersonaList.kdRatio /= overviewList.length;
        resolve(reducedPersonaList);
      })
      .catch(reject)
  );
}

function generateServerMessage(overviewsData) {
  return new Promise((resolve) => {
    const sortedPlayersOverviews = overviewsData
      .sort((playerA, playerB) => playerB.skill - playerA.skill);

    Promise.all(sortedPlayersOverviews.map(getOverviewMessage))
      .then(resolve);
  });
}

function getOverviewMessage(player, index) {
  return new Promise((resolve) => {
    const { name, skill, kdRatio, timePlayed } = player;
    const time = `${Math.floor(timePlayed / 3600, 0)}h`;
    resolve(`${index + 1}. **${name}**\n\t**skill:**: ${skill} - **kd:** ${kdRatio.toFixed(2)} **time:** ${time}`);
  });
}
