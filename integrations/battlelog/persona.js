const request = require('request');
const overview = require('./overview');

module.exports = {
  getPersona
};

function getPersona(personaId) {
  return new Promise((resolve, reject) => {
    overview.getOverview(personaId)
      .then((personaOverview) => {
        request(`http://battlelog.battlefield.com/bf4/user/overviewBoxStats/${personaOverview.currentUserId}/`, (error, response) => {
          const parsedBody = JSON.parse(response.body);
          if (error) {
            reject(personaId);
          } else {
            let playerPersona;
            parsedBody.data.soldiersBox.some((soldier) => {
              if (soldier.persona.personaId === personaId) {
                playerPersona = soldier.persona;
                return true;
              }
              return false;
            });
            resolve(playerPersona);
          }
        });
      })
      .catch(reject);
  });
}

