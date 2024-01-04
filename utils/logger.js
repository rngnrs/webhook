
function log(str) {
  const datetime = new Date().toLocaleString();
  process.stdout.write(`[${datetime}] ${str}\n`);
}

function error(err) {
  const datetime = new Date().toLocaleString();
  process.stderr.write(`[${datetime}] Failed to execute command:\n`);
  process.stderr.write(`error: ${err}\n`);
}

module.exports = {
  log,
  error
};
