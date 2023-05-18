import path from 'path';
import simpleGit from 'simple-git';
import { log } from './log';

/**
 * 初始化 git 项目
 * @param name 项目名称
 */
async function gitInitialize(name: string) {
  const rootDir: string = process.cwd();
  const installPath: string = path.resolve(`${rootDir}/${name}`);
  const git = simpleGit(installPath);

  try {
    await git.init();
  } catch (e: any) {
    log.error('git 初始化失败', e.message);
  }
}

export default gitInitialize;
