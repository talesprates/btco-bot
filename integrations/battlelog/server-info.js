const request = require('request');
const Maps = require('../../Maps');

module.exports = {
  getServerJSON,
  getServerStatus
};

function getServerJSON(server) {
  return new Promise((resolve, reject) => {
    const { serverId, serverName } = server;
    request(`http://battlelog.battlefield.com/bf4/servers/show/pc/${serverId}/?json=1`, (error, response) => {
      const parsedBody = JSON.parse(response.body);
      if (error || parsedBody.message === 'SERVER_INFO_NOT_FOUND') {
        reject(`${serverId} ${serverName}`);
      } else {
        resolve(parsedBody.message);
      }
    });
  });
}

function getServerStatus(server) {
  const { serverName } = server;
  return new Promise((resolve, reject) => {
    getServerJSON(server)
      .then((serverJSON) => {
        const serverInfo = serverJSON.SERVER_INFO;
        const parsedServerInfo =
          {
            name: serverName,
            currentPlayers: serverInfo.slots['2'].current,
            maxPlayers: serverInfo.slots['2'].max,
            playersQueue: serverInfo.slots['1'].current,
            map: getMapName(serverInfo.map)
          };
        resolve(parsedServerInfo);
      })
      .catch(reject);
  });
}

function getMapName(name) {
  let displayName = name;

  Maps.bf4maps.some((server) => {
    if (server.raw === name) {
      displayName = server.displayName;
      return true;
    }
    return false;
  });

  return displayName;
}
