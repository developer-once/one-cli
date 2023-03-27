#! /usr/bin/env node
import { Command } from 'commander';
import create from '../commands/create/index';
import cz from '../commands/cz';
import publish from '../commands/publish';
// import init from '../commands/init';
import { checkLogin, checkVersion, log, PREFIX } from '../utils/index';

const program = new Command();

program.option('-d, --debug', '是否开启调试模式', false);

// ---------- init ----------
const pkg = require('../../package.json');

// ---------- create ----------
program
  .command('create')
  // --no-git 指定 options 里的变量名字， 前缀--no 会取反
  .option('-n, --no-git', '跳过 git 初始化', false)
  .description('create page or template')
  .action((git) => {
    // 询问创建项目还是创建模板
    create(git);
  });

// ---------- cz ----------
program
  .command('cz')
  .description('git commitizen')
  .action(() => {
    cz();
  });

// ---------- publish ----------
program
  .command('publish')
  .description('npm publish, 遵循 SemVer 规则')
  // 检测是否登陆
  .hook('preAction', async () => {
    await checkLogin().catch(() => {
      log.info(PREFIX, '请先登陆 npm 账户');
      process.exit();
    });
  })
  .action(async () => {
    await publish();
  });
// 这里设置的是全局配置
program
  .name(Object.keys(pkg.bin)[0])
  .usage('<command> [options]')
  .version(pkg.version)
  .hook('preAction', () => {
    checkVersion(pkg.name, pkg.version);
  })
  .parse(process.argv);

process.on('uncaughtException', (e) => {
  // TODO: 错误上报
  log.error('uncaughtException', e.message);
  process.exit();
});

process.on('unhandledRejection', (reason) => {
  // TODO: 错误上报
  log.error('Unhandled rejection:', reason as string);
  process.exit();
});
