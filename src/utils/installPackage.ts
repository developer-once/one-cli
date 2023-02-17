// 从缓存目录下载 npm 包
import execa from 'execa';
import fs from 'fs-extra';
import { homedir } from 'os';
import path from 'path';
import pkg from '../../package.json';
import { log, PREFIX } from './log';
/**
 *
 * @param cachePath 缓存目录
 * @param packageName 包名
 */
const defaultCachePath = path.resolve(
  getDefaultCacheDir(),
  Object.keys(pkg.bin)[0],
  'node_modules',
);
async function execInstall(cachePath: string, packageName: string, version: string) {
  const installCommand = 'npm';
  const installArgs = ['install', `${packageName}@${version}`];
  const cwd = cachePath;
  await execa(installCommand, installArgs, { cwd });
}

function getDefaultCacheDir() {
  return homedir();
}

async function makeCacheDir(targetPath: string) {
  try {
    await fs.ensureDir(targetPath);
    log.verbose(PREFIX, '创建目录成功');
  } catch (err: any) {
    log.error('创建缓存目录失败', err.message);
  }
}

async function installPackage(packageName: string, version: string) {
  try {
    await makeCacheDir(defaultCachePath);
    await execInstall(defaultCachePath, packageName, version);
  } catch (err: any) {
    log.error('安装模板失败', err.message);
  }
}

export { installPackage, defaultCachePath };
