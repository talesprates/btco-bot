const request = require('request');
const Snapshot = require('./models/Snapshot');

module.exports = {
  getServerSnapshot,
};

function getServerSnapshot({ serverId, serverName }) {
  return new Promise((resolve, reject) => {
    request(`http://keeper.battlelog.com/snapshot/${serverId}`, (error, response) => {
      const parsedBody = JSON.parse(response.body);
      if (error || parsedBody === 'No such game' || parsedBody.snapshot.gameMode !== 'ConquestLarge') {
        reject(`${serverId} ${serverName}`);
      } else {
        resolve(new Snapshot(parsedBody.snapshot));
      }
    });
  });
}
