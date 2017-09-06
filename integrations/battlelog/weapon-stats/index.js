const group = require('./group');
const individual = require('./individual');

module.exports = {
  getWeapons
};

function getWeapons(personaId, weaponSlug) {
  const individualOrGroup = Array.isArray(personaId) ? group : individual;
  const singleOrMultiple =
    weaponSlug ? individualOrGroup.getSingleWeapon : individualOrGroup.getAllWeapons;

  return singleOrMultiple(personaId, weaponSlug);
}
