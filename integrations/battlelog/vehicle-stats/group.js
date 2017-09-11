const Vehicle = require('../models/Vehicle');
const individual = require('./individual');

module.exports = {
  getSingleVehicle,
  getAllVehicles
};

function getAllVehicles(personaList) {
  return new Promise((resolve, reject) => {
    Promise.all(personaList.map(persona => individual.getAllVehicles(persona)))
      .then(vehicleList => vehicleList.reduce(reduceAllWeapons))
      .then(resolve)
      .catch(reject);
  });
}

function reduceAllWeapons(vl1, vl2) {
  return Object.keys(vl1).reduce((reducedList, key) => {
    reducedList[key] = vl2[key] ? Vehicle.add(vl1[key], vl2[key]) : vl1[key];
    return reducedList;
  }, {});
}

function getSingleVehicle(personaList, vehicleSlug) {
  return new Promise((resolve, reject) => {
    getAllVehicles(personaList)
      .then(vehicleList => resolve({ [vehicleSlug]: vehicleList[vehicleSlug] }))
      .catch(reject);
  });
}
