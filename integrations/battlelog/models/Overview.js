module.exports = class Overview {
  constructor(overview) {
    this.currentUserId = overview.currentUserId;
    this.rank = overview.rank;
    this.skill = overview.skill;
    this.kills = overview.kills;
    this.deaths = overview.deaths;
    this.kdRatio = overview.kdRatio;
    this.serviceStars = overview.serviceStars;
    this.accuracy = overview.accuracy;
    this.kitScores = overview.kitScores;
    this.scorePerMinute = overview.scorePerMinute;
    // TODO implement serviceStarsGameModes
    // this.serviceStarsGameModes = overview.serviceStarsGameModes;
    this.numWins = overview.numWins;
    this.numLosses = overview.numLosses;
    this.timePlayed = overview.timePlayed;
    this.score = overview.score;
  }

  static add(overviewList) {
    const reducedOverview = overviewList.reduce((ov1, ov2) => {
      const overview = { serviceStars: {}, kitScores: {} };
      overview.currentUserId = ov1.currentUserId;
      overview.rank = ov1.rank;
      overview.skill = ov1.skill;
      overview.kills = ov1.kills + ov2.kills;
      overview.deaths = ov1.deaths + ov2.deaths;
      overview.kdRatio = ov1.kdRatio + ov2.kdRatio;
      Object.keys(ov1.serviceStars).forEach((kit) => {
        overview.serviceStars[kit] = ov1.serviceStars[kit] + ov2.serviceStars[kit];
      });
      overview.accuracy = ov1.accuracy + ov2.accuracy;
      Object.keys(ov1.kitScores).forEach((kit) => {
        overview.kitScores[kit] = ov1.kitScores[kit] + ov2.kitScores[kit];
      });
      overview.scorePerMinute = ov1.scorePerMinute + ov2.scorePerMinute;
      // this.serviceStarsGameModes = overview.serviceStarsGameModes;
      overview.numWins = ov1.numWins + ov2.numWins;
      overview.numLosses = ov1.numLosses + ov2.numLosses;
      overview.timePlayed = ov1.timePlayed + ov2.timePlayed;
      overview.score = ov1.score + ov2.score;
      return overview;
    });
    reducedOverview.kdRatio /= overviewList.length;
    reducedOverview.accuracy /= overviewList.length;
    reducedOverview.scorePerMinute /= overviewList.length;
    return new Overview(reducedOverview);
  }
};
