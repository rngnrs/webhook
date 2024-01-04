const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);
const { error, log } = require("./logger");

async function executeCommand(cmd, onsuccess, onfail) {
  return new Promise(async (resolve) => {
    log(`Executing ${cmd}...`);
    try {
      await exec(cmd);
      log('Success.');
      if (onsuccess) {
        try {
          await exec(onsuccess);
        } catch (err) {
          error(err);
        }
      }
      return resolve(true);
    } catch (err) {
      error(err);
      if (onfail) {
        try {
          await exec(onfail);
        } catch (err) {
          //
        }
      }
      return resolve(false);
    }
  })
}

module.exports = executeCommand;
