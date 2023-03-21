// eslint-disable-next-line
import lint from '@commitlint/lint';
import execa from 'execa';
import fs from 'fs-extra';
import inquirer from 'inquirer';
import ora from 'ora';
import simpleGit from 'simple-git';
import { publishType } from '../type/index';
import { generateChangelog, getNewVersion, getVersion, log, PREFIX } from '../utils/index';
// eslint-disable-next-line
const { rules } = require('@commitlint/config-conventional');

async function commitMessage() {
  return inquirer
    .prompt([
      {
        type: 'input',
        name: 'message',
        message: `是输入此次git commit 的消息(建议遵循 angular 规范)`,
        validate: async (input) => {
          const { valid, errors } = await lint(input, rules);
          if (errors.length) {
            log.verbose(PREFIX, JSON.stringify(errors));
            log.error(PREFIX, `参考格式: <type>(<scope>): <subject> 的commit `);
          }
          return valid;
        },
      },
    ])
    .then((answer) => answer.message);
}

async function selectPublishType() {
  const { version } = getVersion();
  const publishTypeArray = Object.values(publishType);
  const choices = publishTypeArray.reduce((next: any[], cur) => {
    const newVersion = getNewVersion(version, cur);
    next.push({
      name: `${cur}(${newVersion})`,
      value: newVersion,
    });
    return next;
  }, []);
  return inquirer
    .prompt([
      {
        type: 'list',
        name: 'type',
        message: '请选择发布的类型:',
        choices,
      },
    ])
    .then((answer) => answer.type);
}
async function publish() {
  // 选择操作类型
  const newVersion = await selectPublishType();
  log.verbose('newVersion', newVersion);
  // TODO: 可使用chatgpt自动生成commit消息
  const message = await commitMessage();
  // // check 一下
  if (newVersion) {
    const spinner = ora('发布中...').start();
    try {
      // 提交 git 信息表示此次变动的范围
      const git = simpleGit(process.cwd());
      // 版本更新
      updateVersion(newVersion);
      await git.add('.');
      log.verbose('git add', 'success');
      await git.commit(message);
      log.verbose('git commit', 'success');
      await generateChangelog('angular');
      log.verbose('generateChangelog', 'success');
      await git.add('.');
      log.verbose('generateChangelog', 'success');
      await git.add('.');
      log.verbose('git add changelog', 'success');
      await git.commit('docs: 更改CHANGELOG.md');
      log.verbose('git commit changelog', 'success');
      git.branchLocal(async (branchErr, branches) => {
        if (branchErr) {
          log.error(PREFIX, branchErr.message);
          process.exit();
        } else {
          await git.push('origin', branches.current);
          log.verbose('git push', 'success');
          await git.tag(['-a', `v${newVersion}`, '-m', `Release version v${newVersion}`]);
          log.verbose('git tag', 'success');
          await git.pushTags('origin', {});
          log.verbose('git push tag', 'success');
          execBuild();
          // 发布至 npm
          execPublish();
          spinner.succeed('发布成功');
        }
      });
    } catch (e: any) {
      spinner.fail('发布失败');
      log.error(PREFIX, e.message);
    }
  }
}
function updateVersion(newVersion: string) {
  const rootDir = process.cwd();
  const binPath = `${rootDir}/package.json`;
  const pkg = fs.readJsonSync(binPath);
  log.verbose('updateVersion', `${pkg.version} -> ${newVersion}`);
  fs.writeJSONSync(
    binPath,
    {
      ...pkg,
      version: newVersion,
    },
    {
      replacer: null,
      spaces: 2,
    },
  );
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
