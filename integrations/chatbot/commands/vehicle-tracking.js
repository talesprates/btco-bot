const variables = require('../../../variables');
const { vehicleStats, persona } = require('../../battlelog/');

module.exports = {
  pattern: /^!vehicle(?: (.*))?$/,
  handler: vehicleTrack,
  description: '**!vehicle** [wheels]: show the tracked players vehicle kills'
};

function vehicleTrack(message, callback, wheels) {
  const trackedPlayers = variables.TRACKED_PLAYERS;
  Promise.all(trackedPlayers.map(personaId => getVehicle(personaId, wheels)))
    .then(generateServerMessage)
    .then(serverMessage => callback(serverMessage.join('\n')))
    .catch(error => callback(`error retrieving vehicle info (${error})`));
}

function getVehicle(personaId, wheels) {
  return new Promise((resolve, reject) => {
    persona.getPersona(personaId)
      .then((playerPersona) => {
        let wheelsStats;
        if (wheels) {
          vehicleStats.getMainVehicleStats(personaId)
          .then((wheelsData) => {
            const found = wheelsData.mainVehicleStats.some((vehicle) => {
              if (vehicle.slug.toUpperCase().indexOf(wheels.toUpperCase()) !== -1) {
                wheelsStats = vehicle;
                return true;
              }
              return false;
            });

            if (!found) {
              reject('invalid vehicle');
            } else {
              resolve(
                {
                  name: playerPersona.personaName,
                  vehicle: wheelsStats
                });
            }
          })
          .catch(reject);
        } else {
          vehicleStats.getMainVehicleStats(personaId)
            .then(weaponsData => resolve(
              {
                name: playerPersona.personaName,
                vehicle: weaponsData.mainVehicleStats.sort((v1, v2) => v2.kills - v1.kills)[0]
              }))
            .catch(reject);
        }
      });
  });
}

function generateServerMessage(playersVehicles) {
  return new Promise((resolve) => {
    const serverMessage = [];
    const sortedPlayersVehicles = playersVehicles
      .sort((playerA, playerB) => playerB.vehicle.kills - playerA.vehicle.kills);

    sortedPlayersVehicles.forEach((player, index) => {
      serverMessage.push(`${index + 1}. **${player.name}** *${player.vehicle.slug.toUpperCase()}* - **${player.vehicle.kills}**`);
    });

    resolve(serverMessage);
  });
}
