import fs from 'fs';
import chalk from 'chalk';
import downloadGitRepo from 'download-git-repo';

// eslint-disable-next-line max-len
function downloadReport(url: string, name: string, description: string, author: string, version: string) {
  downloadGitRepo(url, name, { clone: true }, (err: any) => {
    if (err) {
      console.error(err);
    }
    // -- 读取package.json --
    fs.readFile(`./${name}/package.json`, 'utf8', (err1, data) => {
      if (err1) {
        console.error(err1);
        return;
      }

      const packageJson = JSON.parse(data);
      packageJson.name = name;
      packageJson.description = description;
      packageJson.author = author;
      packageJson.version = version;

      // 修改package.json
      fs.writeFile(`./${name}/package.json`, JSON.stringify(packageJson, null, 2), 'utf8', (err3) => {
        if (err3) {
          console.error(err3);
        } else {
          console.log(chalk.green('NCun init successfully. Now run:'));
          console.log(`
          ${chalk.yellow(`cd ${name}`)}
          ${chalk.yellow('npm install (or `yarn`)')}
          ${chalk.yellow('npm run dev (or `yarn dev`)')}
        `);
        }
      });
    });
  });
}

export default downloadReport;
