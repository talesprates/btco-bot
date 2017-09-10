module.exports = class Player {
  constructor(player) {
    this.deaths = player.deaths;
    this.kills = player.kills;
    this.name = player.name;
    this.rank = player.rank;
    this.role = player.role;
    this.score = player.score;
    this.squad = player.squad;
    this.tag = player.tag;
  }
};
