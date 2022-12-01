const http = require('http');
const crypto = require('crypto');
const { exec } = require('child_process');

let config;

try {
  config = require('./config.json');
} catch (err) {
  if (err.code === 'ENOENT') {
    console.error('Please create `./config.json`');
    return;
  }
  console.log(err);
  console.error('Unexpected error. Usually this should not happen. Report this!');
}

const { host, port, hooks } = config;

http.createServer((req, res) => {
  let data = '';
  req.on('data', chunk => data += chunk);
  req.on('end', () => processRequest(req, data));
  res.end();
}).listen(port, host, () => {
  console.log(`Webhook has been planted.\nhttp://${host}:${port}`);
});

function processRequest(req, data) {
  let { cmd, secret } = processEvent(data);
  if (checkSecret(req, data, secret)) {
    executeCommand(cmd);
  }
}

function processEvent(data) {
  try {
    data = JSON.parse(data);
    return hooks.find(h => (h.user === data.user) && (h.repo === data.repo) && (h.event === data.event));
  } catch (e) {
    console.error('JSON parsing error');
  }
}

function checkSecret(req, data, secret) {
  if (!req.headers['x-hub-signature']) {
    return true;
  }
  if (!secret) {
    console.error('Secret is not set');
    return false;
  }
  let sig = "sha1=" + crypto.createHmac('sha1', secret).update(data.toString()).digest('hex');
  return req.headers['x-hub-signature'] === sig;
}

function executeCommand(cmd) {
  let datetime = new Date().toLocaleString();
  console.log(`[${datetime}] Executing ${cmd}...`);

  exec(cmd, (error, stdout, stderr) => {
    let datetime = new Date().toLocaleString();
    if (error) {
      console.log(`[${datetime}] Failed to execute command:`);
      console.error(`error: ${error}`);
      return;
    }
    if (!stderr) {
      console.log(`[${datetime}] Success.`);
      return;
    }
    console.log(`[${datetime}] Fail:`);
    console.error(`stderr: ${stderr}`);
  });
}
