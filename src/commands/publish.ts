import { green } from 'chalk';
import execa from 'execa';
import fs from 'fs-extra';
import inquirer from 'inquirer';
import ora from 'ora';
import type { publishType } from '../type/index';
import { generateChangelog, getNewVersion, getVersion, log, PREFIX } from '../utils/index';

async function checkUpdate(oldVersion: string, newVersion: string) {
  return inquirer
    .prompt([
      {
        type: 'confirm',
        name: 'checked',
        message: `是否确定将 ${green(oldVersion)} 升级为 ${green(newVersion)}`,
        default: true,
      },
    ])
    .then((answer) => answer.checked);
}

async function publish(type: publishType) {
  // 查看当前版本
  const { version } = getVersion();
  // 根据类型获取新的版本
  const newVersion = getNewVersion(version, type);
  // check 一下
  if (newVersion) {
    const checked = await checkUpdate(version, newVersion);
    log.verbose('checked', checked);
    if (checked) {
      const spinner = ora('发布中...').start();
      // 版本更新
      const rootDir = process.cwd();
      try {
        const pkg = fs.readJsonSync(`${rootDir}/package.json`);
        fs.writeJSONSync(
          `${rootDir}/package.json`,
          {
            ...pkg,
            version: newVersion,
          },
          {
            replacer: null,
            spaces: 2,
          },
        );
        // 打包
        execBuild();
        // 发布至 npm
        execPublish();
        // 提交 git 信息
        // 生成changelog
        generateChangelog('angular');
        spinner.succeed('发布成功');
      } catch (e: any) {
        spinner.fail('发布失败');
        log.error(PREFIX, e.message);
      }
    }
  }
}
async function execPublish() {
  const cwd = process.cwd();
  const installCommand = 'npm';
  const installArgs = ['publish'];
  await execa(installCommand, installArgs, { cwd });
}
async function execBuild() {
  const cwd = process.cwd();
  const installCommand = 'npm';
  const installArgs = ['run', 'build'];
  try {
    await execa(installCommand, installArgs, { cwd });
  } catch (e: any) {
    log.error(PREFIX, e.message);
  }
}
export default publish;
