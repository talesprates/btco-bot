const personaList = require('./mocks/personas');
const overviewList = require('./mocks/overviews');

const assertMessage =
  [
    '1. **patodomau**\n\t**skill:**: 900 - **kd:** 7.44 **time:** 6h',
    '2. **Chap0linColorad0**\n\t**skill:**: 720 - **kd:** 5.30 **time:** 642h',
    '3. **Pirat4Alm4Negr4**\n\t**skill:**: 120 - **kd:** 2.30 **time:** 0h'
  ];

describe('Overview Tracking', () => {
  it('should display a message with the overview of each persona', () => {
    const message = generateResponseMessage([overviewList, personaList]);
    expect(message).toEqual(assertMessage);
  });
});

function generateResponseMessage([overviews, personas]) {
  const serverMessage = overviews.map((personaOverview, index) => {
    const resultOverview = { overview: overviews[index], persona: personas[index] };
    return resultOverview;
  }).sort((player1, player2) => player2.overview.skill - player1.overview.skill)
    .map((player, index) => {
      const { skill, kdRatio, timePlayed } = player.overview;
      const time = `${Math.floor(timePlayed / 3600, 0)}h`;
      return `${index + 1}. **${player.persona.personaName}**\n\t**skill:**: ${skill} - **kd:** ${kdRatio.toFixed(2)} **time:** ${time}`;
    });
  return serverMessage;
}
