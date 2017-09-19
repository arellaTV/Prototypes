const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const fs = require('fs');

app.use('/', express.static(`${__dirname}/../client/build`));

app.get('/api/last-git-commit', (req, res) => {
  fs.readFile('server/latest-commit.json', 'utf8', function(err, data) {
    if (err) {
      res.json(err);
      return;
    };
    const commit = JSON.parse(data);
    res.json(commit);
  });
});

app.listen(port, () => console.log(`Currently listening at port: ${port}`));