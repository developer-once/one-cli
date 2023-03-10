// eslint-disable-next-line
import lint from '@commitlint/lint';
import { green } from 'chalk';
import execa from 'execa';
import fs from 'fs-extra';
import inquirer from 'inquirer';
import ora from 'ora';
import simpleGit from 'simple-git';
import type { publishType } from '../type/index';
import { generateChangelog, getNewVersion, getVersion, log, PREFIX } from '../utils/index';
// eslint-disable-next-line
const { rules } = require('@commitlint/config-conventional');

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
async function publish(type: publishType) {
  // 查看当前版本
  const { version } = getVersion();
  // 根据类型获取新的版本
  const newVersion = getNewVersion(version, type);
  const message = await commitMessage();
  // check 一下
  if (newVersion) {
    const checked = await checkUpdate(version, newVersion);
    log.verbose('checked', checked);
    if (checked) {
      const spinner = ora('发布中...').start();
      try {
        // TODO: 重构代码 simpleGit的API设计得真der,得包装一层 Promise
        // 提交 git 信息表示此次变动的范围
        const git = simpleGit(process.cwd());
        // 版本更新
        updateVersion(newVersion);
        git.add('.').then(
          (addSuccess) => {
            log.verbose('git add . success', addSuccess);
            // 提交 commit消息
            git.commit(message, (err) => {
              if (!err) {
                log.verbose('git commit success', message);
                // 生成changelog
                generateChangelog('angular').then(() => {
                  log.verbose(PREFIX, 'generateChangelog success');
                  // 提交 changelog
                  git.add('.').then(() => {
                    log.verbose(PREFIX, 'git add changelog success');
                    git.commit('docs: 更改CHANGELOG.md', (commiterr) => {
                      if (!commiterr) {
                        log.verbose(PREFIX, 'git commit changelog success');
                        git.branchLocal((branchErr, branches) => {
                          if (branchErr) {
                            log.error(PREFIX, branchErr.message);
                            process.exit();
                          } else {
                            git.push('origin', branches.current, {}, (e) => {
                              log.verbose(PREFIX, 'git push success');
                              if (e) {
                                log.error(PREFIX, e.message);
                              } else {
                                // 推送tag
                                // 打tag
                                git.tag(
                                  ['-a', `v${newVersion}`, '-m', `Release version v${newVersion}`],
                                  (tagErr, tagResult) => {
                                    if (tagErr) {
                                      log.error('创建 tag 失败', tagErr.message);
                                      process.exit();
                                    } else {
                                      log.verbose('创建 tag 成功', tagResult);
                                      // git push
                                      git.pushTags('origin', {}, (pushErr, pushResult) => {
                                        if (pushErr) {
                                          log.error('推送 tag 失败', pushErr.message);
                                          process.exit();
                                        } else {
                                          log.info('推送 tag 成功', JSON.stringify(pushResult));
                                          // 打包
                                          execBuild();
                                          // // 发布至 npm
                                          execPublish();
                                          spinner.succeed('发布成功');
                                        }
                                      });
                                    }
                                  },
                                );
                              }
                            });
                          }
                        });
                      }
                    });
                  });
                });
              } else {
                log.error(PREFIX, err.message);
              }
            });
          },
          (addFailed) => {
            log.error(PREFIX, addFailed);
          },
        );
        log.verbose(PREFIX, '版本升级完成...');
      } catch (e: any) {
        spinner.fail('发布失败');
        log.error(PREFIX, e.message);
      }
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
