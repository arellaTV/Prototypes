const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const git = require('git-last-commit');


app.use('/', express.static(`${__dirname}/../client/build`));

app.get('/api/last-git-commit', (req, res) => {
  git.getLastCommit(function(err, commit) {
    if (err) {
      res.json(err);
      return;
    }
    res.json(commit);
  });
});

app.listen(port, () => console.log(`Currently listening at port: ${port}`));