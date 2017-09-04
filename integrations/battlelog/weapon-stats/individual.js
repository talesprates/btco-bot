const request = require('request');
const Weapon = require('../models/Weapon');

module.exports = {
  getSingleWeapon,
  getAllWeapons
};

function getAllWeapons(personaId) {
  return new Promise((resolve, reject) => {
    request(`http://battlelog.battlefield.com/bf4/warsawWeaponsPopulateStats/${personaId}/1/stats/`, (error, response) => {
      const parsedBody = JSON.parse(response.body);
      if (error) {
        reject(personaId);
      } else {
        const weaponList = {};
        parsedBody.data.mainWeaponStats.forEach((weapon) => {
          weaponList[weapon.slug] = new Weapon(weapon);
        });
        resolve(weaponList);
      }
    });
  });
}

function getSingleWeapon(personaId, weaponSlug) {
  return new Promise((resolve, reject) => {
    getAllWeapons(personaId)
      .then(weaponList => resolve({ [weaponSlug]: weaponList[weaponSlug] }))
      .catch(reject);
  });
}
