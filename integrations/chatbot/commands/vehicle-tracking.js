const { TRACKED_PLAYERS } = require('../../../variables');
const { vehicleStats, persona } = require('../../battlelog/');

module.exports = {
  pattern: /^!vehicle(?: (.*))?$/,
  handler: vehicleTrack,
  description: '**!vehicle** [slug]: show the tracked players vehicle kills'
};

const TOPVEHICLE = 0;

function vehicleTrack(message, callback, vehicle) {
  vehicleStats.isValidVehicle(vehicle)
    .then(vehicleSlug => Promise.all(
      [
        Promise.all(TRACKED_PLAYERS.map(personaId =>
          vehicleStats.getVehicles(personaId, vehicleSlug))),
        Promise.all(TRACKED_PLAYERS.map(persona.getPersona))
      ]
    ))
    .then(generateResponseMessage)
    .then(callback)
    .catch(callback);
}

function generateResponseMessage([vehicles, personas]) {
  return new Promise((resolve) => {
    const serverMessage = vehicles.map((vehicle, index) => {
      const sortedVehicles = Object.values(vehicle)
        .sort((vehicle1, vehicle2) => vehicle2.kills - vehicle1.kills);
      return { vehicle: sortedVehicles[TOPVEHICLE], persona: personas[index] };
    }).sort((player1, player2) => player2.vehicle.kills - player1.vehicle.kills)
      .map(({ vehicle, persona: soldier }, index) => `${index + 1}. **${soldier.personaName}** *${vehicle.slug.toUpperCase()}* - **${vehicle.kills}**`);
    resolve(serverMessage);
  });
}
