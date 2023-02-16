import axios from 'axios';
import execa from 'execa';
import fs from 'fs-extra';
import { homedir } from 'os';
import path from 'path';
import type { developerOnceNpmName, templateInfo } from '../type/index';

const npmRegistry = 'https://registry.npmjs.org/';
const TEMP_HOME = 'one-cli';

// TODO: 自动从用户环境去获取，更好的搭配一些换源工具
async function getNpmInfo(npmName: developerOnceNpmName, registryUrl = npmRegistry) {
  return await axios.get(registryUrl + npmName).then(({ data }) => {
    return data;
  });
}

async function getlatestVersion(npmName: developerOnceNpmName) {
  return await getNpmInfo(npmName).then((data) => {
    // 说明没有不存在 lastest
    if (!data['dist-tags'] || !data['dist-tags'].latest) {
      console.error('找不到 latest');
      return Promise.reject(new Error('找不到 latest'));
    }
    return data['dist-tags'].latest;
  });
}

// 通过 npm install 实现安装模板， 如果没有 node_modules 会安装失败
function makeCacheDir(): string {
  const cachePath = path.resolve(`${homedir()}`, `${TEMP_HOME}`, 'template');
  if (!fs.existsSync(cachePath)) {
    fs.ensureDirSync(path.resolve(cachePath, 'node_modules'));
  }
  return cachePath;
}
async function download(cachePath: string, templateInfo: templateInfo) {
  const { npmName, version } = templateInfo;
  const installCommand = 'npm';
  const installArgs = ['install', `${npmName}@${version}`];
  const cwd = cachePath;
  await execa(installCommand, installArgs, { cwd });
}
async function copyFile(cachePath: string, templateInfo: templateInfo, installPath: string) {
  const originFile = path.resolve(
    cachePath,
    'node_modules',
    ...templateInfo.npmName.split('/'),
    'template',
  );
  const fileList = fs.readdirSync(originFile);
  fileList.map(async (item) => {
    fs.copySync(`${originFile}/${item}`, `${installPath}/${item}`);
  });
}
// function copyFromCache() {
//   const rootDir = process.cwd();
// }
async function downloadPackage(templateInfo: templateInfo, name: any) {
  const latestVersion = await getlatestVersion(templateInfo.npmName);
  if (latestVersion !== templateInfo.version) {
    console.warn(`模板有更新哦😜`);
  }
  const cachePath = makeCacheDir();
  try {
    await download(cachePath, templateInfo);
    const rootDir = process.cwd();
    const installPath = path.resolve(`${rootDir}/${name}`);
    console.log('installPath', installPath);
    // TODO: 是否强制安装
    if (!fs.existsSync(installPath)) {
      fs.ensureDirSync(installPath);
    }
    await copyFile(cachePath, templateInfo, installPath);
  } catch (e) {
    console.error(e);
  }

  // return latestVersion;
}

export default downloadPackage;
