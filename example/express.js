const express = require('express');
const app = express();
const { Middleware } = require('../lib');

const baseDirectory = require('path').dirname(require.main.filename);
const config = {
  baseDirectory,
  label: 'api'
}

app.use(Middleware(config))

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
