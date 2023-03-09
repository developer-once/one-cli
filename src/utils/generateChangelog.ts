// eslint-disable-next-line
import conventionalChangelog from 'conventional-changelog';
import fs from 'fs-extra';
import path from 'path';
import { log, PREFIX } from './log';

const CHANGELOGNAME = 'CHANGELOG.md';
const cwd = process.cwd();

const generateChangelog = (preset: string) => {
  const writerStream = fs.createWriteStream(path.resolve(cwd, CHANGELOGNAME));
  const readStream = conventionalChangelog({
    preset,
  });
  readStream.pipe(writerStream);
  // writerStream.end();
  log.verbose(CHANGELOGNAME, path.resolve(cwd, CHANGELOGNAME));
  writerStream.on('finish', () => {
    log.verbose(PREFIX, '写入完成。');
  });

  writerStream.on('error', (err) => {
    log.error(PREFIX, err.message);
  });
};
export default generateChangelog;
