import checkVersion from './checkVersion';
import copyTemplate from './copyTemplate';
import generateChangelog from './generateChangelog';
import getNewVersion from './getNewVersion';
import getVersion from './getVersion';
import gitInitialize from './git';
import { installPackage } from './installPackage';
import { log, PREFIX } from './log';

export {
  generateChangelog,
  installPackage,
  log,
  PREFIX,
  copyTemplate,
  gitInitialize,
  checkVersion,
  getVersion,
  getNewVersion,
};
