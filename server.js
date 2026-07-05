const http = require('http');
const PORT = process.env.PORT || 8080;

const html = `
<!DOCTYPE html>
<html>
<head><title>Demo App</title>
<style>
  body { font-family: Arial, sans-serif; background: #f4f4f4; text-align: center; padding-top: 100px; }
  .card { background: white; display: inline-block; padding: 40px 60px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
  h1 { color: #333; }
  .badge { background: #999; color: white; padding: 5px 15px; border-radius: 20px; font-size: 14px; }
</style>
</head>
<body>
  <div class="card">
    <h1>CI/CD Demo Microservice</h1>
    <p class="badge">Version 1.0 — Build: ${process.env.BUILD_ID || 'local'}</p>
    <p>Deployed via Tekton pipeline.</p>
  </div>
</body>
</html>`;

const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({status: 'ok'}));
    return;
  }
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(html);
});

server.listen(PORT, () => console.log('listening on ' + PORT));
