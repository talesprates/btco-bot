const { TRACKED_PLAYERS } = require('../../../variables');
const { overview, persona } = require('../../battlelog/');

module.exports = {
  pattern: /^!overview(?: (.*))?$/,
  handler: overviewTrack,
  description: '**!overview**: show the tracked players overview stats'
};

function overviewTrack(message, callback) {
  Promise.all(
    [
      Promise.all(TRACKED_PLAYERS.map(overview.getOverview)),
      Promise.all(TRACKED_PLAYERS.map(persona.getPersona))
    ])
    .then(generateServerMessage)
    .then(callback)
    .catch(error => callback(`error retrieving player overview (${error})`));
}

function generateServerMessage([overviews, personas]) {
  return new Promise((resolve) => {
    const serverMessage = overviews.map((personaOverview, index) => {
      const resultOverview = { overview: overviews[index], persona: personas[index] };
      return resultOverview;
    }).sort((player1, player2) => player2.overview.skill - player1.overview.skill)
      .map((player, index) => {
        const { skill, kdRatio, timePlayed } = player.overview;
        const time = `${Math.floor(timePlayed / 3600, 0)}h`;
        return `${index + 1}. **${player.persona.name}**\n\t**skill:**: ${skill} - **kd:** ${kdRatio.toFixed(2)} **time:** ${time}`;
      });
    resolve(serverMessage);
  });
}
