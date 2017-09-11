const Player = require('./Player');

module.exports = class Team {
  constructor(team, tickets) {
    this.tickets = tickets.tickets || 0;
    this.ticketsMax = tickets.ticketsMax || 0;
    this.faction = team.faction;
    this.players = Object.keys(team.players).reduce((playerList, personaId) => {
      playerList[personaId] = new Player(team.players[personaId]);
      return playerList;
    }, {});
  }

  getSize() {
    return Object.keys(this.players).length;
  }

  getFlag() {
    if (this.faction === 0) {
      return ':flag_us:';
    }
    return this.faction === 1 ? ':flag_ru:' : ':flag_cn:';
  }
};
