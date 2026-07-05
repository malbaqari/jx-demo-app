const http = require('http');
const PORT = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({status: 'ok'}));
    return;
  }
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello from the CI/CD demo microservice! Build: ' + (process.env.BUILD_ID || 'local') + '\n');
});

server.listen(PORT, () => console.log('listening on ' + PORT));
// trigger test
