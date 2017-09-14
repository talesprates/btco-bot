const group = require('./group');
const individual = require('./individual');
const { bf4vehicles } = require('./Vehicles');

module.exports = {
  getVehicles,
  isValidVehicle
};

function getVehicles(personaId, vehicleSlug) {
  const individualOrGroup = Array.isArray(personaId) ? group : individual;
  const singleOrMultiple =
    vehicleSlug ? individualOrGroup.getSingleVehicle : individualOrGroup.getAllVehicles;

  return singleOrMultiple(personaId, vehicleSlug);
}

function isValidVehicle(slug) {
  return new Promise((resolve, reject) => {
    let gunStats;
    const found = bf4vehicles.some((vehicle) => {
      if (vehicle.toUpperCase().indexOf(slug.toUpperCase()) !== -1) {
        gunStats = vehicle;
        return true;
      }
      return false;
    });

    if (found) {
      resolve(gunStats);
    } else {
      reject('invalid vehicle');
    }
  });
}
