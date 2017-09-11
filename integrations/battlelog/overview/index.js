const group = require('./group');
const individual = require('./individual');

module.exports = {
  getOverview
};

function getOverview(personaId) {
  const individualOrGroup = Array.isArray(personaId) ? group : individual;
  return individualOrGroup.getOverview(personaId);
}
