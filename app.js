const app = require('express')();
const fs = require('fs');
const port = process.env['PORT'] || 3101;

const paths = (path) => [`${__dirname}/views/${path}.html`, `${__dirname}/views/${path}/index.html`];

const router = (req, resp) => {
  let filePath = `${__dirname}/views/${req.path}.html`;
  const pathTests = paths(req.path);

  while (filePath && !fs.existsSync(filePath)) {
    filePath = pathTests.pop();
  }
  if (!filePath) { return resp.send('404'); }
  resp.sendFile(filePath);
}

app.get('/index', router);
app.get('/canonical', router);
app.get('/hash', router);
app.get('/bang', router);

app.get('/hidden', router);
app.get('/hidden/shown-link', router);
app.get('/hidden/hidden-link', router);

app.get('/', function (request, response) {
  var result = 'App is running'
  response.send(result);
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
