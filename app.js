const app = require('express')();
const fs = require('fs');
const sm = require('sitemap');

const sitemaps = sm.createSitemap({
  hostname: process.env['BASE_URL'] || 'https://test-hash.herokuapp.com/',
  cacheTime: 600000,        // 600 sec - cache purge period
  urls: [
    { url: '/index/', changefreq: 'daily', priority: 0.3 },
    { url: '/canonical/', changefreq: 'daily', priority: 0.7 },
    { url: '/hidden/', changefreq: 'daily', priority: 0.5 }
  ]
});
const port = process.env['PORT'] || 3101;

const paths = (path) => [`${__dirname}/views/${path}.html`,
  `${__dirname}/views/${path.slice(0, -1)}.html`,
  `${__dirname}/views/${path}/index.html`,
  `${__dirname}/views/${path.slice(0, -1)}/index.html`
];

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
app.get('/', router);

app.get('/sitemap.xml', (req, res) => {
  sitemaps.toXML((err, xml) => {
    if (err) {
      return res.status(500).end();
    }
    res.header('Content-Type', 'application/xml');
    res.send(xml);
  });
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
