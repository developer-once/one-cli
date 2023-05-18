const path = require('path');
const { bootstrap } = require('commitizen/dist/cli/git-cz');

function cz() {
  bootstrap(
    {
      cliPath: path.join(__dirname, '../../node_modules/commitizen'),
      config: {
        path: 'cz-conventional-changelog',
      },
    },
    // importance 这里会把 one-cli 的参数透传给 git-cz 会导致无法识别的参数导致失败
    process.argv.filter((item) => item !== 'cz'),
  );
}
export default cz;
