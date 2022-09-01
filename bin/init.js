#! /usr/bin/env node
const program = require('commander');

program.version(require('../package.json').version);

program
  .option('init, --init <type>', '当前目录初始化项目')
  .option('create, --create <type>', '当前目录创建模版')

// ---------- init ----------
program 
  .command('init')
  .description('init project')
  .action((source, destination) => {
    // ---- 执行 lib 下的文件 ----
    require("../lib/init", source)
  })

// ---------- create ----------
program
  .command('create')
  .description('create page')
  .action((source, destination) => {
    // ---- 执行 lib 下的文件 ----
    require("../lib/create", source)
  })

// ---------- cz ----------
program
  .command('cz')
  .description('git commitizen')
  .action((source, destination) => {
    // ---- 执行 lib 下的文件 ----
    require("../lib/create", source)
  })


program.parse(process.argv)