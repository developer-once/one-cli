#! /usr/bin/env node
import { Command } from 'commander';
import init from '../commands/init';
import create from '../commands/create';
import cz from '../commands/cz';


const program = new Command();


program.version(require('../../package.json').version);

program
  .option('init, --init <type>', '当前目录初始化项目')
  .option('create, --create <type>', '当前目录创建模版')
  .option('cz, --cz', '当前目录下载并配置 package.json 文件 commitizen')

// ---------- init ----------
program
  .command('init')
  .description('init project')
  .action(() => {
    init();
  })

// ---------- create ----------
program
  .command('create')
  .description('create page')
  .action(() => {
    create();
  })

// ---------- cz ----------
program
  .command('cz')
  .description('git commitizen')
  .action(() => {
    cz();
  })


program.parse(process.argv)