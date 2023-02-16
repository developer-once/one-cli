#! /usr/bin/env node
import { Command } from 'commander';
import pkg from '../../package.json';
import create from '../commands/create';
import cz from '../commands/cz';
import init from '../commands/init';

const program = new Command();
// 这里设置的是全局的 options
// program
//   .option('init, --init <type>', '当前目录初始化项目')
//   .option('create, --create <type>', '当前目录创建模版')
//   .option('cz, --cz', '当前目录下载并配置 package.json 文件 commitizen');

// ---------- init ----------

program
  .command('init')
  // --no-git 指定 options 里的变量名字， 前缀--no 会取反
  // .option('-n, --no-git', '跳过 git 初始化')
  .description('init project')
  .action(() => {
    // console.log(option);
    init();
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

program
  .name(Object.keys(pkg.bin)[0])
  .usage('<command> [options]')
  .version(pkg.version)
  .parse(process.argv);
