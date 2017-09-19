const request = require('request');
const fs = require('fs');

const options = {
  url: 'https://api.github.com/repos/hold-the-door-game/Prototypes/git/refs/heads/master',
  headers: {
    'User-Agent': 'request'
  }
};

request(options, function(err, res, body) {
  const master = JSON.parse(body);
  const options = {
    url: master.object.url,
    headers: {
      'User-Agent': 'request'
    }
  }
  request(options, function(err, res, body) {
    fs.writeFile('server/latest-commit.json', body, 'utf8');
  });
});