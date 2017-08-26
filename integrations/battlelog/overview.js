const request = require('request');

module.exports = {
  getOverview
};

function getOverview(personaId) {
  return new Promise((resolve, reject) => {
    request(`http://battlelog.battlefield.com/bf4/warsawoverviewpopulate/${personaId}/1/`, (error, response) => {
      const parsedBody = JSON.parse(response.body);
      if (error || parsedBody.data.statsTemplate === 'profile.statsinternalerror') {
        reject(personaId);
      } else {
        resolve(parsedBody.data);
      }
    });
  });
}

