const group = require('./group');
const individual = require('./individual');

module.exports = {
  getVehicles
};

function getVehicles(personaId, vehicleSlug) {
  const individualOrGroup = Array.isArray(personaId) ? group : individual;
  const singleOrMultiple =
    vehicleSlug ? individualOrGroup.getSingleVehicle : individualOrGroup.getAllVehicles;

  return singleOrMultiple(personaId, vehicleSlug);
}
