const variables = require('../../../variables');
const { weaponStats, persona } = require('../../battlelog/');

module.exports = {
  pattern: /^!weapon(?: (.*))?$/,
  handler: weaponTrack,
  description: '**!weapon** [gun]: show the tracked players weapon kills'
};

function weaponTrack(message, callback, gun) {
  const trackedPlayers = variables.TRACKED_PLAYERS;
  Promise.all(trackedPlayers.map(personaId => getWeapon(personaId, gun)))
    .then(generateServerMessage)
    .then(serverMessage => callback(serverMessage.join('\n')))
    .catch(error => callback(`error retrieving weapon info (${error})`));
}

function getWeapon(personaId, gun) {
  return new Promise((resolve, reject) => {
    persona.getPersona(personaId)
      .then((playerPersona) => {
        let gunStats;
        if (gun) {
          weaponStats.getMainWeaponStats(personaId)
          .then((weaponsData) => {
            const found = weaponsData.mainWeaponStats.some((weapon) => {
              if (weapon.slug.toUpperCase().indexOf(gun.toUpperCase()) !== -1) {
                gunStats = weapon;
                return true;
              }
              return false;
            });

            if (!found) {
              reject('invalid weapon');
            } else {
              resolve(
                {
                  name: playerPersona.personaName,
                  weapon: gunStats
                });
            }
          })
          .catch(reject);
        } else {
          weaponStats.getMainWeaponStats(personaId)
            .then(weaponsData => resolve(
              {
                name: playerPersona.personaName,
                weapon: weaponsData.mainWeaponStats[0]
              }))
            .catch(reject);
        }
      });
  });
}

function generateServerMessage(playersWeapons) {
  return new Promise((resolve) => {
    const serverMessage = [];
    const sortedPlayersWeapons = playersWeapons
      .sort((playerA, playerB) => playerB.weapon.kills - playerA.weapon.kills);

    sortedPlayersWeapons.forEach((player, index) => {
      serverMessage.push(`${index + 1}. **${player.name}**\n\t*${player.weapon.slug.toUpperCase()}* - **${player.weapon.kills}** (*${player.weapon.accuracy.toFixed(2)}%*)`);
    });

    resolve(serverMessage);
  });
}
