(() => {
  /* eslint global-require: 0 */
  function serverTrack(message, serverName) {
    return('server-track ok');
  }

  module.exports = {
    pattern: /^!servers(?: (.*))?$/,
    handler: serverTrack,
    description: '!servers [serverName]'
  };
})();