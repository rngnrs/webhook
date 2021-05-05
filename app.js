let dotenv = require('dotenv').config();

try {
  if (dotenv.error && !['HOST','PORT','REPO'].some(key => Object.keys(process.env).includes(key))) {
    throw dotenv.error;
  }
} catch (err) {
  if (err.code === 'ENOENT') {
    console.error('Please create `./.env` based on the `./env.example` or define environment variables.');
    return;
  }
  console.log(err);
  console.error('Unexpected error. Usually this should not happen. Report this!');
}

const http = require('http');
const crypto = require('crypto');
const { exec } = require('child_process');

// Required params
const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 56709;
const repo = process.env.REPO || './';

// Optional
const secret = process.env.SECRET;
const postHook = process.env.POST_HOOK;

let cmd = `cd ${repo} && git pull`;
if (postHook) {
  cmd += ` && ${postHook}`;
}

function respondOnSecret(req, chunk) {
  let sig = "sha1=" + crypto.createHmac('sha1', secret).update(chunk.toString()).digest('hex');

  if (req.headers['x-hub-signature'] === sig) {
    return executeCommand();
  }
}

function executeCommand() {
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

http.createServer((req, res) => {
  if (secret) {
    req.on('data', chunk => respondOnSecret(req, chunk));
  } else {
    req.on('data', executeCommand);
  }
  res.end();
}).listen(port, host, () => {
  console.log(`
  Webhook has been planted.
  From now on, a request to http://${host}:${port}
  ` + (secret
    ? `with the secret "${secret}"`
    : `without any secret (shame on you!!1)`) +
    ` will execute this:

      ${cmd}

  `);
});
