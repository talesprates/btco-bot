const request = require('request');
const overview = require('./overview');
const Persona = require('./models/Persona');

module.exports = {
  getPersona
};

const BATTLEFIELD4 = 2048;
const PC = 1;
const MAINPERSONA = 0;

function getPersona(personaId) {
  return new Promise((resolve, reject) => {
    overview.getOverview(Array.isArray(personaId) ? personaId[MAINPERSONA] : personaId)
      .then((personaOverview) => {
        request(`http://battlelog.battlefield.com/bf4/user/overviewBoxStats/${personaOverview.currentUserId}/`, (error, response) => {
          const parsedBody = JSON.parse(response.body);
          if (error) {
            reject(personaId);
          } else {
            let playerPersona;
            parsedBody.data.soldiersBox.some((soldier) => {
              if (soldier.game === BATTLEFIELD4 && soldier.platform === PC) {
                playerPersona = soldier.persona;
                return true;
              }
              return false;
            });
            resolve(new Persona(playerPersona));
          }
        });
      })
      .catch(reject);
  });
}
