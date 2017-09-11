const Overview = require('../models/Overview');
const individual = require('./individual');

module.exports = {
  getOverview
};

function getOverview(personaList) {
  return new Promise((resolve, reject) =>
    Promise.all(personaList.map(individual.getOverview))
      .then(Overview.add)
      .then(resolve)
      .catch(reject)
  );
}
