// const shell = require('shelljs');
import shell from 'shelljs';


const cz = () => {

  // ---- 判断是否存在 gz ----
  if (!shell.which('commitizen')) {
    shell.exec('npm install -g commitizen')
    shell.exec('npm install -g cz-conventional-changelog')

    // ---- 2. 当前项目文件夹 cz 初始化 ----
    if (shell.exec('commitizen init cz-conventional-changelog --save --save-exact').code !== 0) {
      shell.echo('Error: cz init failed');
      shell.exit(1);
    }
  }

  // ---- 3. 当前项目文件夹 cz 初始化 ----
  // const userType = shell.exec('git cz', { async: true });
  // userType?.stdout?.on('data', function(data: string) {
  //   console.log("++++", data)
  // })

  shell.echo('Success: cz init success! Please enter 「git add xxx」&&「git cz」at the command line to use!');
};

export default cz;
