module.exports = class Overview {
  constructor(overview) {
    const overviewStats = overview.overviewStats;
    this.currentUserId = overview.currentUserId;
    this.rank = overviewStats.rank;
    this.skill = overviewStats.skill;
    this.kills = overviewStats.kills;
    this.deaths = overviewStats.deaths;
    this.kdRatio = overviewStats.kdRatio;
    this.serviceStars = overviewStats.serviceStars;
    this.accuracy = overviewStats.accuracy;
    this.kitScores = overviewStats.kitScores;
    this.scorePerMinute = overviewStats.scorePerMinute;
    this.serviceStarsGameModes = overviewStats.serviceStarsGameModes;
    this.numWins = overviewStats.numWins;
    this.numLosses = overviewStats.numLosses;
    this.timePlayed = overviewStats.timePlayed;
    this.score = overviewStats.score;
  }
};
