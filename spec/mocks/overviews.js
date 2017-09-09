// Mockups for the overview class
const Overview = require('../../integrations/battlelog/models/Overview');

module.exports =
[
  // first overview
  new Overview({
    currentUserId: '2955060605436370145',
    rank: 140,
    skill: 720,
    kills: 19291,
    deaths: 100,
    kdRatio: 5.3,
    serviceStars: 0,
    accuracy: 0.92,
    kitScores: 0,
    scorePerMinute: 3000,
    numWins: 10000,
    numLosses: 200,
    timePlayed: 2312312,
    score: 0
  }),
  // second overview
  new Overview({
    currentUserId: '2955058496243835074',
    rank: 140,
    skill: 120,
    kills: 19291,
    deaths: 1110,
    kdRatio: 2.3,
    serviceStars: 0,
    accuracy: 0.22,
    kitScores: 0,
    scorePerMinute: 1000,
    numWins: 1000,
    numLosses: 20,
    timePlayed: 2232,
    score: 0
  }),
  // third overview
  new Overview({
    currentUserId: '2955061300085717736',
    rank: 110,
    skill: 900,
    kills: 1929111,
    deaths: 10,
    kdRatio: 7.44,
    serviceStars: 0,
    accuracy: 1.00,
    kitScores: 0,
    scorePerMinute: 6000,
    numWins: 20000,
    numLosses: 300,
    timePlayed: 22312,
    score: 0
  })
];

