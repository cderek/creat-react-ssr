const express = require('express');
const ReactSSR = require('react-dom/server');
const fs = require('fs');
const path = require('path');
const serverEntry = require('../dist/server-entry').default;

const template = fs.readFileSync(
  path.join(__dirname, '../dist/index.html'),
  'utf8'
);

const app = express();

app.use('/public', express.static(path.join(__dirname, '../dist')));

app.get('*', function(req, res) {
  const appString = ReactSSR.renderToString(serverEntry);

  const templateStr = template.replace('<!--app-->', appString);

  res.send(templateStr);
});

const host = 'localhost';
const port = process.PORT || '3000';
app.listen(port, host, () => {
  console.log(`The application is running on ${host}:${port}`);
});
