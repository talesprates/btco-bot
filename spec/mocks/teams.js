// Mockups for the team class
const Team = require('../../integrations/battlelog/models/Team');
const players = require('./players');

module.exports =
[
  // first team
  new Team({
    faction: 0,
    players:
    {
      1433945435: players[0],
      1691209613: players[1],
      988666508: players[2]
    }
  }, { tickets: 980, ticketsMax: 1200 }),
  // second team
  new Team({
    faction: 1,
    players:
    {
      321811096: players[3],
      340055022: players[4],
      377082275: players[5]
    }
  }, { tickets: 320, ticketsMax: 1200 })
];

