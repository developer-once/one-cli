// --- 入口文件 ---
// --- 生成 Services ---
import inquirer from 'inquirer';
import { generateService } from './index';
import { log } from '../../utils/index';

enum createType {
  PROJECT = 'project',
  TEMPLATE = 'template',
}

async function selectType() {
  return inquirer
    .prompt([
      {
        type: 'list',
        name: 'type',
        choices: [createType.PROJECT, createType.TEMPLATE],
        message: '选择要创建的类型',
      },
    ])
    .then((answer) => answer.type);
}

const openAPI = async () => {
  const type = await selectType();
  log.verbose('type', type);
  generateService({});
};

export default openAPI;