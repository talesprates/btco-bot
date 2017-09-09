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
    // TODO implement serviceStarsGameModes
    // this.serviceStarsGameModes = overviewStats.serviceStarsGameModes;
    this.numWins = overviewStats.numWins;
    this.numLosses = overviewStats.numLosses;
    this.timePlayed = overviewStats.timePlayed;
    this.score = overviewStats.score;
  }

  static add(overviewList) {
    const resultOverview = overviewList.reduce((reducedOverview, overview) => {
      console.log(reducedOverview);
      reducedOverview.currentUserId = overview.currentUserId;
      reducedOverview.rank = overview.rank;
      reducedOverview.skill = overview.skill;
      reducedOverview.kills += overview.kills;
      reducedOverview.deaths += overview.deaths;
      reducedOverview.kdRatio += overview.kdRatio;
      // reducedOverview.serviceStars = Object.keys(overview.serviceStars).forEach((kit) => {
      //   reducedOverview.serviceStars[kit] += overview.serviceStars[kit];
      // });
      reducedOverview.accuracy += overview.accuracy;
      // reducedOverview.kitScores = Object.keys(overview.kitScores).forEach((kit) => {
      //   reducedOverview.kitScores[kit] += overview.kitScores[kit];
      // });
      reducedOverview.scorePerMinute += overview.scorePerMinute;
      // this.serviceStarsGameModes = overviewStats.serviceStarsGameModes;
      reducedOverview.numWins += overview.numWins;
      reducedOverview.numLosses += overview.numLosses;
      reducedOverview.timePlayed += overview.timePlayed;
      reducedOverview.score += overview.score;
      return reducedOverview;
    }, {});
    resultOverview.kdRatio /= resultOverview.length;
    resultOverview.accuracy /= resultOverview.length;
    resultOverview.scorePerMinute /= resultOverview.length;
    return new Overview(resultOverview);
  }
};
