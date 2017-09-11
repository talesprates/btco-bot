const snapshotList = require('./mocks/snapshots');

const assertMessage =
  [
    '***[BTCO]***\n\t**players:** 6/64 (0)\n\t**map**: Operation Locker\n\t**tickets**: :flag_us: 980/320 :flag_ru:\n\t**total tickets**: 1200\n\t\t[BTCO] Chap0linColorad0\n\t\t[BTCO] Pirat4Alm4Negr4\n\t\tRobson_Guedes'
  ];

describe('Server Tracking', () => {
  it('should display a message of each tracked server snapshot', () => {
    const message = generateResponseMessage(snapshotList, [{ serverName: 'BTCO' }]);
    expect(message).toEqual(assertMessage);
  });
});

function generateResponseMessage(snapshots, servers) {
  const serverMessage = snapshots.map((snapshot, index) => {
    const [alphaTeam, bravoTeam] = snapshot.teamInfo;

    let message = `***[${servers[index].serverName.substring(0, 4)}]***`;
    message += `\n\t**players:** ${snapshot.getOnlinePlayers()}/${snapshot.maxPlayers} (${snapshot.waitingPlayers})`;
    message += `\n\t**map**: ${snapshot.getMapName()}`;
    message += `\n\t**tickets**: ${alphaTeam.getFlag()} ${alphaTeam.tickets}/${bravoTeam.tickets} ${bravoTeam.getFlag()}`;
    message += `\n\t**total tickets**: ${bravoTeam.ticketsMax}`;

    [1433945435, 1691209613, 377082275].forEach((personaId) => {
      if (alphaTeam.players[personaId] || bravoTeam.players[personaId]) {
        const player = alphaTeam.players[personaId] || bravoTeam.players[personaId];
        message += player.tag.length ? `\n\t\t[${player.tag}] ${player.name}` : `\n\t\t${player.name}`;
      }
    });
    return message;
  });
  return serverMessage;
}
