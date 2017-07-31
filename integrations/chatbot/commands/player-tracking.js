(() => {
  /* eslint global-require: 0 */
  function playerTrack(message, playerName) {
    return('player-track ok');
  }

  module.exports = {
    pattern: /^!players(?: (.*))?$/,
    handler: playerTrack,
    description: '!players [player-name]'
  };
})();