const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 8080;

const knownAssets = ['/gitex.css', '/current.html', '/page-before.html', '/page-after.html'];

const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({status: 'ok'}));
    return;
  }

  const cleanUrl = req.url.split('?')[0];
  const filePath = knownAssets.includes(cleanUrl)
    ? path.join(__dirname, cleanUrl)
    : path.join(__dirname, 'current.html');

  const ext = path.extname(filePath);
  const contentType = ext === '.css' ? 'text/css; charset=utf-8' : 'text/html; charset=utf-8';

  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404, {'Content-Type': 'text/plain'}); res.end('Not found'); return; }
    res.writeHead(200, {'Content-Type': contentType});
    res.end(data);
  });
});

server.listen(PORT, () => console.log('listening on ' + PORT));
