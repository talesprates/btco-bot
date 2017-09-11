const request = require('request');
const Vehicle = require('../models/Vehicle');

module.exports = {
  getSingleVehicle,
  getAllVehicles
};

function getAllVehicles(personaId) {
  return new Promise((resolve, reject) => {
    request(`http://battlelog.battlefield.com/bf4/warsawvehiclesPopulateStats/${personaId}/1/stats/`, (error, response) => {
      const parsedBody = JSON.parse(response.body);
      if (error) {
        reject(personaId);
      } else {
        resolve(parsedBody.data.mainVehicleStats.reduce((vehicleList, vehicle) => {
          vehicleList[vehicle.slug] = new Vehicle(vehicle);
          return vehicleList;
        }, {}));
      }
    });
  });
}

function getSingleVehicle(personaId, vehicleSlug) {
  return new Promise((resolve, reject) => {
    getAllVehicles(personaId)
      .then(vehicleList => resolve({ [vehicleSlug]: vehicleList[vehicleSlug] }))
      .catch(reject);
  });
}
