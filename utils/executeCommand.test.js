const executeCommand = require("./executeCommand");

const SUCCESSFUL_COMMAND = "echo 'eek'";
const FAILING_COMMAND = `cd /non-existent/`;

describe('executeCommand', () => {

  it('should return true for successful command', async () => {
    const cmd = await executeCommand(SUCCESSFUL_COMMAND);
    expect(cmd).toBe(true);
  });

  it('should return true for successful command with successful onsuccess', async () => {
    let onsuccess = SUCCESSFUL_COMMAND;
    const cmd = await executeCommand(SUCCESSFUL_COMMAND, onsuccess);
    expect(cmd).toBe(true);
  });

  it('should return true for successful command with failing onsuccess', async () => {
    let onsuccess = FAILING_COMMAND;
    const cmd = await executeCommand(SUCCESSFUL_COMMAND, onsuccess);
    expect(cmd).toBe(true);
  });


  it('should return false for failing command', async () => {
    const cmd = await executeCommand(FAILING_COMMAND);
    expect(cmd).toBe(false);
  });

  it('should return false for failing command with successful onfail', async () => {
    let onfail = SUCCESSFUL_COMMAND;
    const cmd = await executeCommand(FAILING_COMMAND, '', onfail);
    expect(cmd).toBe(false);
  });

});
