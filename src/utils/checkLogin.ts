import { exec } from 'child_process';

async function checkLogin() {
  return new Promise((resolve, reject) => {
    exec('npm whoami', (err, _, stderr) => {
      if (err) {
        reject(err);
      }

      if (stderr) {
        reject(new Error(`错误信息: ${stderr}`));
      }
      resolve(true);
    });
  });
}

export default checkLogin;
