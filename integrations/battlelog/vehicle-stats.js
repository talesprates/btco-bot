const request = require('request');

module.exports = {
  getMainVehicleStats
};

function getMainVehicleStats(personaId) {
  return new Promise((resolve, reject) => {
    request(`http://battlelog.battlefield.com/bf4/warsawvehiclesPopulateStats/${personaId}/1/stats/`, (error, response) => {
      const parsedBody = JSON.parse(response.body);
      if (error) {
        reject(personaId);
      } else {
        resolve(parsedBody.data);
      }
    });
  });
}
