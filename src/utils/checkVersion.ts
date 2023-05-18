// const REGISTRY = 'https://registry.npmjs.org/';
import axios from 'axios';
import execa from 'execa';
import path from 'path';
import semver from 'semver';
import { green} from 'chalk'
import { log, PREFIX } from './log';

async function checkVersion(name: string, version: string) {
  try {
    // 获取当前 npm 注册地址,通过 REGISTRY + 包名获取远程版本
    const command = 'npm';
    const args = ['config', 'get', 'registry'];
    const cwd = path.resolve(`${process.cwd()}`);
    const { stdout } = await execa(command, args, { cwd });
    const REGISTRY: string = stdout;
    log.verbose('npm解析的地址是:', REGISTRY);
    const { data } = await axios.get(REGISTRY + name);
    if (data['dist-tags'] && data['dist-tags'].latest) {
      const originVersin = data['dist-tags'].latest;
      log.verbose('当前远程的版本是:', originVersin);
      if (semver.compare(originVersin, version) > 0) {
        log.info('可以更新版本', `当前版本${green(version)} -> ${green(originVersin)}`, );
      }
    } else {
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
