const express = require('express');
const app = express();
const port = process.env['PORT'] || 3101;

app.get('/index', (req, resp) => resp.sendFile(__dirname + '/views/index.html'));
app.get('/canonical', (req, resp) => resp.sendFile(__dirname + '/views/canonical.html'));

app.get('/hash', (req, resp) => resp.sendFile(__dirname + '/views/_hash.html'));
app.get('/bang', (req, resp) => resp.sendFile(__dirname + '/views/_bang.html'));

app.listen(3101, () => console.log(`Example app listening on port ${port}!`));
