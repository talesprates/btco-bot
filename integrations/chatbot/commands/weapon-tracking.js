const { weaponStats, persona } = require('../../battlelog/');
const { TRACKED_PLAYERS } = require('../../../variables');

const TOPWEAPON = 0;

module.exports = {
  pattern: /^!weapon(?: (.*))?$/,
  handler: weaponTrack,
  description: '**!weapon** [gun]: show the tracked players weapon kills'
};

function weaponTrack(message, callback, weaponSlug) {
  Promise.all(
    [
      Promise.all(TRACKED_PLAYERS.map(personaId => weaponStats.getWeapons(personaId, weaponSlug))),
      Promise.all(TRACKED_PLAYERS.map(persona.getPersona))
    ])
    .then(generateResponseMessage)
    .then(callback)
    .catch(callback);
}

function generateResponseMessage([weapons, personas]) {
  return new Promise((resolve) => {
    const serverMessage = weapons.map((weapon, index) => {
      const playerPersona = personas[index];
      const sortedWeapons = Object.values(weapon)
        .sort((weapon1, weapon2) => weapon2.kills - weapon1.kills);
      return { weapon: sortedWeapons[TOPWEAPON], persona: playerPersona };
    }).sort((player1, player2) => player2.weapon.kills - player1.weapon.kills)
      .map((player, index) => {
        const accuracy = player.weapon.shotsHit / player.weapon.shotsFired;
        return `${index + 1}. **${player.persona.personaName}**\n\t*${player.weapon.slug.toUpperCase()}* - **${player.weapon.kills}** (*${accuracy.toFixed(2)}%*)`;
      });
    resolve(serverMessage);
  });
}
