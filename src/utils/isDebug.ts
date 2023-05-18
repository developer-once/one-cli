/*
 * This code checks the command line arguments and returns
 * true if the user has specified that the program should
 * run in debug mode.
 */
function isDebug(): boolean {
  return process.argv.includes('--debug') || process.argv.includes('--d');
}

export default isDebug;
