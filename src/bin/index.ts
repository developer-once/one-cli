#! /usr/bin/env node
import { Command } from 'commander';
import create from '../commands/create';
import cz from '../commands/cz';
import init from '../commands/init';
import { log } from '../utils/index';

const program = new Command();

program.option('-d, --debug', '是否开启调试模式', false);

// ---------- init ----------
const pkg = require('../../package.json');

program
  .command('init')
  // --no-git 指定 options 里的变量名字， 前缀--no 会取反
  .option('-n, --no-git', '跳过 git 初始化', false)
  .description('init project')
  .action((git) => {
    log.verbose('git', git);
    init(git);
  });

// ---------- create ----------
program
  .command('create')
  .description('create page')
  .action(() => {
    create();
  });

// ---------- cz ----------
program
  .command('cz')
  .description('git commitizen')
  .action(() => {
    cz();
  });

// 这里设置的是全局配置
program
  .name(Object.keys(pkg.bin)[0])
  .usage('<command> [options]')
  .version(pkg.version)
  .parse(process.argv);
