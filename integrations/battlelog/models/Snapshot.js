const { bf4maps } = require('../../../Maps');
const Team = require('./Team');

module.exports = class Snapshot {
  constructor(snapshot) {
    this.currentMap = snapshot.currentMap.split('/').splice(3, 1);
    this.gameMode = snapshot.gameMode;
    this.maxPlayers = snapshot.maxPlayers;
    this.roundTime = snapshot.roundTime;
    this.waitingPlayers = snapshot.waitingPlayers;
    this.teamInfo = Object.values(snapshot.teamInfo).slice(1)
      .map((team, index) => new Team(team, snapshot.conquest[index + 1]));
  }

  getOnlinePlayers() {
    return this.teamInfo.reduce((onlinePlayers, team) => onlinePlayers + team.getSize(), 0);
  }

  getMapName() {
    let displayName = this.currentMap;

    bf4maps.some((map) => {
      if (!map.raw.localeCompare(this.currentMap)) {
        displayName = map.displayName;
        return true;
      }
      return false;
    });

    return displayName;
  }
};
