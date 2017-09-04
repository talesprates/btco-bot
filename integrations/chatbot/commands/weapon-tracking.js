const { weaponStats } = require('../../battlelog/');
const { TRACKED_PLAYERS } = require('../../../variables');

module.exports = {
  pattern: /^!weapon(?: (.*))?$/,
  handler: weaponTrack,
  description: '**!weapon** [gun]: show the tracked players weapon kills'
};

function weaponTrack(message, callback, weaponSlug) {
  Promise.all(TRACKED_PLAYERS.map((personaId) => {
    const individualOrGroup = personaId.length ? weaponStats.group : weaponStats.individual;
    const singleOrMultiple =
      weaponSlug ? individualOrGroup.getSingleWeapon : individualOrGroup.getAllWeapons;

    return singleOrMultiple(personaId, weaponSlug);
  }))
  .then(generateResponseMessage)
  .catch(error => console.log(error));
}

function generateResponseMessage(weaponList) {

}
