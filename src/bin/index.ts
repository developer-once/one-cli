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

// ---------- init ----------
program
  .command('init')
  .description('init project')
  .action((source: any, destination: any) => {
    init(destination);
  })

// ---------- create ----------
program
  .command('create')
  .description('create page')
  .action((source, destination) => {
    create(destination);
  })

// ---------- cz ----------
program
  .command('cz')
  .description('git commitizen')
  .action((source, destination) => {
    cz(destination);
    // ---- 执行 lib 下的文件 ----
    // require("../lib/create", source)
  })


program.parse(process.argv)