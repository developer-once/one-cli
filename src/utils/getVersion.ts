import fs from 'fs-extra';
import path from 'path';

function getVersion() {
  const cwd = path.resolve(`${process.cwd()}`);
  const pkg = fs.readJsonSync(`${cwd}/package.json`);
  return {
    npmName: pkg.name as string,
    version: pkg.version as string,
  };
}
export default getVersion;
