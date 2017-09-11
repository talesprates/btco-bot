// Mockups for the snapshot class
const Snapshot = require('../../integrations/battlelog/models/Snapshot');
const teams = require('./teams');

module.exports =
[
  new Snapshot({
    conquest: { 1: { tickets: 980, ticketsMax: 1200 }, 2: { tickets: 320, ticketsMax: 1200 } },
    currentMap: 'Levels/MP/MP_Prison/MP_Prison',
    gameMode: 'ConquestLarge',
    maxPlayers: 64,
    roundTime: 621,
    waitingPlayers: 0,
    teamInfo: { 0: {}, 1: teams[0], 2: teams[1] }
  })
];
