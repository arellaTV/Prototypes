const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use('/', express.static(`${__dirname}/../client/build`));

app.get('/api/last-git-commit', (req, res) => {
  const hash = process.env.SOURCE_VERSION;
  if (!hash) {
    res.end();
    return;
  }
  res.json({ hash });
});

app.listen(port, () => console.log(`Currently listening at port: ${port}`));