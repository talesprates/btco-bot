const group = require('./group');
const individual = require('./individual');
const { bf4weapons } = require('./Weapons');

module.exports = {
  getWeapons,
  isValidWeapon
};

function getWeapons(personaId, weaponSlug) {
  const individualOrGroup = Array.isArray(personaId) ? group : individual;
  const singleOrMultiple =
    weaponSlug ? individualOrGroup.getSingleWeapon : individualOrGroup.getAllWeapons;

  return singleOrMultiple(personaId, weaponSlug);
}

function isValidWeapon(slug) {
  return new Promise((resolve, reject) => {
    let gunStats;
    const found = bf4weapons.some((weapon) => {
      if (weapon.replace(/-/g, ' ').toUpperCase().indexOf(slug.toUpperCase()) !== -1) {
        gunStats = weapon;
        return true;
      }
      return false;
    });

    if (found) {
      resolve(gunStats);
    } else {
      reject('invalid weapon');
    }
  });
}
