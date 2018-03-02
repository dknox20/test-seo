const express = require('express');
const app = express();
const port = process.env['PORT'] || 3101;

app.get('/index', (req, resp) => resp.sendFile(__dirname + '/views/index.html'));
app.get('/canonical', (req, resp) => resp.sendFile(__dirname + '/views/canonical.html'));

app.get('/hash', (req, resp) => resp.sendFile(__dirname + '/views/_hash.html'));
app.get('/bang', (req, resp) => resp.sendFile(__dirname + '/views/_bang.html'));
app.get('/', function (request, response) {
  var result = 'App is running'
  response.send(result);
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
