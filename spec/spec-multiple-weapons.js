const { multipleWeapons } = require('./mocks/weapons');
const personaList = require('./mocks/personas');

const assertMessage =
  [
    '1. **Chap0linColorad0**\n\t*M416* - **10349** (*0.16%*)',
    '2. **Pirat4Alm4Negr4**\n\t*MPX* - **5855** (*0.17%*)',
    '3. **patodomau**\n\t*BAYONET* - **864** (*0.00%*)'
  ];

describe('Weapon Tracking Multiple Weapon', () => {
  it('should display a message with the top weapon of each persona', () => {
    const message = generateResponseMessage([multipleWeapons, personaList]);
    expect(message).toEqual(assertMessage);
  });
});

function generateResponseMessage([weapons, personas]) {
  const serverMessage = weapons.map((weapon, index) => {
    const playerPersona = personas[index];
    const sortedWeapons = Object.values(weapon)
      .sort((weapon1, weapon2) => weapon2.kills - weapon1.kills);
    return { weapon: sortedWeapons[0], persona: playerPersona };
  }).sort((player1, player2) => player2.weapon.kills - player1.weapon.kills)
    .map((player, index) => {
      const accuracy = player.weapon.shotsHit / player.weapon.shotsFired || 0;
      return `${index + 1}. **${player.persona.personaName}**\n\t*${player.weapon.slug.toUpperCase()}* - **${player.weapon.kills}** (*${accuracy.toFixed(2)}%*)`;
    });
  return serverMessage;
}
