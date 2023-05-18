// const REGISTRY = 'https://registry.npmjs.org/';
import axios from 'axios';
import execa from 'execa';
import fs from 'fs-extra';
import path from 'path';
import semver from 'semver';
import { log, PREFIX } from './log';

const TAGES: string = 'dist-tags';

async function checkVersion() {
  try {
    // 获取当前 npm 注册地址,通过 REGISTRY + 包名获取远程版本
    const command: string = 'npm';
    const args: string[] = ['config', 'get', 'registry'];
    const cwd: string = path.resolve(`${process.cwd()}`);
    log.verbose('当前根路径是:', cwd);

    const { stdout } = await execa(command, args, { cwd });
    const REGISTRY: string = stdout;
    log.verbose('npm解析的地址是:', REGISTRY);

    if (!fs.pathExistsSync(`${cwd}/package.json`)) {
      log.error(PREFIX, '当前根目录下没有 package.json 文件');
      throw new Error('当前根目录下没有 package.json 文件');
    }

    const pkg: any = fs.readJsonSync(`${cwd}/package.json`);
    const currentVersion: string = pkg.version;

    log.verbose('当前本地版本是:', currentVersion);
    
    // 获取远程的版本
    const { data } = await axios.get(REGISTRY + pkg.name);
    if (!data[TAGES] || !data[TAGES].latest) {
      log.info(PREFIX, '当前npm仓库不存在此包');
      return;
    }

    const originVersin = data[TAGES].latest;
    log.verbose('当前远程的版本是:', originVersin);

    // 如果本地版本小于或等于远程版本，则报错
    if (semver.compare(originVersin, currentVersion) >= 0) {
      log.error(PREFIX, '当前本地版本小于或等于仓库版本');
      throw new Error('当前本地版本小于或等于仓库版本,请检查');
    }
    
  } catch (e: any) {
    log.error('解析 npm 注册地址错误', e.message);
  }
}

export default checkVersion;
