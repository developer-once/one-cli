#! /usr/bin/env node
const program = require('commander');
program.version(require('../package.json').version);
program 
  .command('init')
  .description('init project ')
  .action(() => {
      // ---- 执行 lib 下的文件 ----
      require("../lib/init")
  })
  program
  .command('create')
  .description('create pages')
  .action(() => {
      // ---- 执行 lib 下的文件 ----
      require("../lib/create")
  })
program.parse(process.argv)