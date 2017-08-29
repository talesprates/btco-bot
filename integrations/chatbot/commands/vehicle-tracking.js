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
    .then(playersVehicles => generateServerMessage(playersVehicles, wheels))
    .then(serverMessage => callback(serverMessage.join('\n')))
    .catch(error => callback(`error retrieving vehicle info (${error})`));
}

function getVehicle(personaId, wheels) {
  return typeof (personaId) === 'string' ? getSingleVehicle(personaId, wheels) : getMultipleVehicles(personaId, wheels);
}

function getMultipleVehicles(personaList, wheels) {
  return new Promise((resolve, reject) =>
    Promise.all(personaList.map(personaId => getSingleVehicle(personaId, wheels)))
      .then((vehicleList) => {
        const reducedVehicleList = vehicleList.reduce((v1, v2) => {
          v2.name = v1.name;
          v2.vehicle = v2.vehicle.map((v, index) => {
            v.kills += v1.vehicle[index].kills;
            return v;
          });
          return v2;
        });
        resolve(reducedVehicleList);
      })
      .catch(reject)
  );
}

function getSingleVehicle(personaId, wheels) {
  return new Promise((resolve, reject) => {
    persona.getPersona(personaId)
      .then((playerPersona) => {
        if (wheels) {
          vehicleStats.getMainVehicleStats(personaId)
            .then(vehiclesData => findVehicle(vehiclesData.mainVehicleStats, wheels))
            .then(vehicle => resolve({ name: playerPersona.personaName, vehicle }))
            .catch(reject);
        } else {
          vehicleStats.getMainVehicleStats(personaId)
            .then(vehiclesData => resolve(
              { name: playerPersona.personaName, vehicle: vehiclesData.mainVehicleStats }))
            .catch(reject);
        }
      });
  });
}

function findVehicle(vehicles, wheels) {
  return new Promise((resolve, reject) => {
    let wheelsStats;
    const found = vehicles.some((vehicle) => {
      if (vehicle.slug.toUpperCase().indexOf(wheels.toUpperCase()) !== -1) {
        wheelsStats = vehicle;
        return true;
      }
      return false;
    });

    if (found) {
      resolve(wheelsStats);
    } else {
      reject('invalid vehicle');
    }
  });
}

function generateServerMessage(playersVehicles, wheels) {
  console.log(playersVehicles);
  return new Promise((resolve) => {
    const serverMessage = [];

    if (!wheels) {
      playersVehicles.forEach((player) => {
        player.vehicle.sort((v1, v2) => v2.kills - v1.kills);
        player.vehicle = player.vehicle[0];
      });
    }

    const sortedPlayersVehicles = playersVehicles
      .sort((playerA, playerB) => playerB.vehicle.kills - playerA.vehicle.kills);

    sortedPlayersVehicles.forEach((player, index) => {
      serverMessage.push(`${index + 1}. **${player.name}** *${player.vehicle.slug.toUpperCase()}* - **${player.vehicle.kills}**`);
    });

    resolve(serverMessage);
  });
}
