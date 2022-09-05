import shell from 'shelljs';
import fs from 'fs';
// const fs = require('fs');


const cz = async () => {

  // ---- 判断是否存在 gz ----
  if (!shell.which('commitizen')) {
    shell.exec('npm install -g commitizen')
    shell.exec('npm install -g cz-conventional-changelog')
  }

  // ---- 2. 判断当前项目是否已经配置 cz ---
  (fs as any).readFile(`./package.json`, 'utf8', (err: Error, data: any) => {
    if (err) {
      shell.echo(`${err}`);
      shell.exit(1);
    }
    
    const userPackage = JSON.parse(data);

    if (!userPackage?.config?.commitizen) {
      if (shell.exec('commitizen init cz-conventional-changelog --save --save-exact').code !== 0) {
        shell.echo('Error: cz init failed');
        shell.exit(1);
      }
    }

    // ---- 3. 当前项目文件夹 cz 初始化 ----
    shell.echo('Success: cz init success! Please enter 「git add xxx」&&「git cz」at the command line to use!');
  });
};

export default cz;
