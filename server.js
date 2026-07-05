const http = require('http');
const PORT = process.env.PORT || 8080;
const BUILD = process.env.BUILD_ID || 'local';
const startTime = new Date().toISOString();
const html = `<!DOCTYPE html><html><head><title>Microservice Demo</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
* { margin:0; padding:0; box-sizing:border-box; }
body { font-family:-apple-system,'Segoe UI',Roboto,sans-serif; min-height:100vh; display:flex; align-items:center; justify-content:center; background:linear-gradient(135deg,#667eea 0%,#764ba2 100%); }
.card { background:rgba(255,255,255,0.97); border-radius:20px; padding:50px 60px; box-shadow:0 20px 60px rgba(0,0,0,0.3); text-align:center; max-width:480px; }
.status-dot { width:12px; height:12px; background:#10b981; border-radius:50%; display:inline-block; margin-right:8px; box-shadow:0 0 0 4px rgba(16,185,129,0.2); }
h1 { color:#1a1a2e; font-size:28px; margin:20px 0 8px; }
.subtitle { color:#6b7280; font-size:14px; margin-bottom:30px; }
.version-tag { display:inline-block; background:#eef2ff; color:#4f46e5; padding:6px 18px; border-radius:20px; font-weight:600; font-size:14px; margin-bottom:20px; }
.meta { text-align:left; background:#f9fafb; border-radius:12px; padding:20px; font-size:13px; color:#6b7280; }
.meta div { display:flex; justify-content:space-between; padding:4px 0; }
.meta b { color:#1a1a2e; }
</style></head><body>
<div class="card">
<div class="version-tag">v1.0 — Stable</div>
<h1>CI/CD Pipeline Demo</h1>
<p class="subtitle"><span class="status-dot"></span>Service healthy and running</p>
<div class="meta">
<div><span>Build</span><b>${BUILD}</b></div>
<div><span>Deployed via</span><b>Tekton Pipeline</b></div>
<div><span>Started</span><b>${startTime}</b></div>
</div>
</div>
</body></html>`;
const server = http.createServer((req, res) => {
  if (req.url === '/health') { res.writeHead(200, {'Content-Type':'application/json'}); res.end(JSON.stringify({status:'ok', version:'1.0'})); return; }
  res.writeHead(200, {'Content-Type':'text/html'}); res.end(html);
});
server.listen(PORT, () => console.log('listening on ' + PORT));
