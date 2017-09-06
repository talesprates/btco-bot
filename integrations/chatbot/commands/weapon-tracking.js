const { weaponStats, persona } = require('../../battlelog/');
const { TRACKED_PLAYERS } = require('../../../variables');

const WEAPONS = 0;
const PERSONAS = 1;

module.exports = {
  pattern: /^!weapon(?: (.*))?$/,
  handler: weaponTrack,
  description: '**!weapon** [gun]: show the tracked players weapon kills'
};

function weaponTrack(message, callback, weaponSlug) {
  Promise.all(
    [
      getWeapons(TRACKED_PLAYERS, weaponSlug),
      Promise.all(TRACKED_PLAYERS.map(persona.getPersona))
    ])
    .then(generateResponseMessage)
    .then(callback)
    .catch(callback);
}

function getWeapons(personaList, weaponSlug) {
  return Promise.all(personaList.map((personaId) => {
    const individualOrGroup = Array.isArray(personaId) ? weaponStats.group : weaponStats.individual;
    const singleOrMultiple =
      weaponSlug ? individualOrGroup.getSingleWeapon : individualOrGroup.getAllWeapons;

    return singleOrMultiple(personaId, weaponSlug);
  }));
}

function generateResponseMessage(promises) {
  return new Promise((resolve) => {
    resolve('worked');
  });
}
