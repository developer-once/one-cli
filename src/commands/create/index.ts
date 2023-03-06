import inquirer from 'inquirer';
import { log } from '../../utils/index';
import createProject from './createProject';
import createTpl from './createTpl';

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
const create = async (git: boolean) => {
  const type = await selectType();
  log.verbose('type', type);
  if (type === createType.PROJECT) {
    await createProject(git);
  }
  if (type === createType.TEMPLATE) {
    createTpl();
  }
};

export default create;
