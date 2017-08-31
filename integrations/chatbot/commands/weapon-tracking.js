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
    .then(playersWeapons => generateServerMessage(playersWeapons, gun))
    .then(serverMessage => callback(serverMessage.join('\n')))
    .catch(error => callback(`error retrieving weapon info (${error})`));
}

function getWeapon(personaId, gun) {
  return typeof (personaId) === 'string' ? getSingleWeapon(personaId, gun) : getMultipleWeapons(personaId, gun);
}

function getMultipleWeapons(personaList, gun) {
  return new Promise((resolve, reject) =>
    Promise.all(personaList.map(personaId => getSingleWeapon(personaId, gun)))
      .then((weaponList) => {
        console.log(weaponList);
        const reducedWeaponList = weaponList.reduce((v1, v2) => {
          v2.name = v1.name;
          if (!gun) {
            v2.weapon = v2.weapon.map((v, index) => {
              if (v1.weapon[index]) {
                console.log(v.slug, v1.weapon[index].slug, v.kills, v1.weapon[index].kills);
                v.kills += v1.weapon[index].kills;
              }
              return v;
            });
          } else {
            v2.weapon.kills += v1.weapon.kills;
          }
          return v2;
        });
        resolve(reducedWeaponList);
      })
      .catch(reject)
  );
}

function getSingleWeapon(personaId, gun) {
  return new Promise((resolve, reject) => {
    persona.getPersona(personaId)
      .then((playerPersona) => {
        if (gun) {
          weaponStats.getMainWeaponStats(personaId)
            .then(weaponsData => findWeapon(weaponsData.mainWeaponStats, gun))
            .then(weapon => resolve({ name: playerPersona.personaName, weapon }))
            .catch(reject);
        } else {
          weaponStats.getMainWeaponStats(personaId)
            .then((weaponsData) => {
              weaponsData.mainWeaponStats.sort((w1, w2) => w2.slug.localeCompare(w1.slug));
              resolve({ name: playerPersona.personaName, weapon: weaponsData.mainWeaponStats });
            })
            .catch(reject);
        }
      });
  });
}

function findWeapon(weapons, gun) {
  return new Promise((resolve, reject) => {
    let gunStats;
    const found = weapons.some((weapon) => {
      if (weapon.slug.toUpperCase().indexOf(gun.toUpperCase()) !== -1) {
        gunStats = weapon;
        return true;
      }
      return false;
    });

    if (found) {
      resolve(gunStats);
    } else {
      reject('invalid weapon');
    }
  });
}

function generateServerMessage(playersWeapons, gun) {
  return new Promise((resolve) => {
    const serverMessage = [];

    if (!gun) {
      playersWeapons.forEach((player) => {
        player.weapon.sort((v1, v2) => v2.kills - v1.kills);
        player.weapon = player.weapon[0];
      });
    }
    const sortedPlayersWeapons = playersWeapons
      .sort((playerA, playerB) => playerB.weapon.kills - playerA.weapon.kills);

    sortedPlayersWeapons.forEach((player, index) => {
      serverMessage.push(`${index + 1}. **${player.name}**\n\t*${player.weapon.slug.toUpperCase()}* - **${player.weapon.kills}** (*${player.weapon.accuracy.toFixed(2)}%*)`);
    });

    resolve(serverMessage);
  });
}
