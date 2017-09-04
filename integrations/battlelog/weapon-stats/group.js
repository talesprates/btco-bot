const Weapon = require('../models/Weapon');
const individual = require('./individual');

module.exports = {
  getSingleWeapon,
  getAllWeapons
};

function getAllWeapons(personaList) {
  return new Promise((resolve, reject) => {
    Promise.all(personaList.map(persona => individual.getAllWeapons(persona)))
      .then(weaponList => weaponList.reduce(reduceAllWeapons))
      .then(resolve)
      .catch(reject);
  });
}

function reduceAllWeapons(wl1, wl2) {
  const reducedList = {};
  Object.keys(wl1).forEach((key) => {
    reducedList[key] = wl2[key] ? Weapon.add(wl1[key], wl2[key]) : wl1[key];
  });
  return reducedList;
}

function getSingleWeapon(personaList, weaponSlug) {
  return new Promise((resolve, reject) => {
    getAllWeapons(personaList)
      .then(weaponList => resolve({ [weaponSlug]: weaponList[weaponSlug] }))
      .catch(reject);
  });
}
