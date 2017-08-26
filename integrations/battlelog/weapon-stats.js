const request = require('request');

module.exports = {
  getMainWeaponStats
};

function getMainWeaponStats(personaId) {
  return new Promise((resolve, reject) => {
    request(`http://battlelog.battlefield.com/bf4/warsawWeaponsPopulateStats/${personaId}/1/stats/`, (error, response) => {
      const parsedBody = JSON.parse(response.body);
      if (error) {
        reject(personaId);
      } else {
        resolve(parsedBody.data);
      }
    });
  });
}

