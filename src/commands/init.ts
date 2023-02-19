import inquirer from 'inquirer';
import ora from 'ora';
import type { templateInfo } from '../type/index';
import { copyTemplate, gitInitialize, installPackage, log, PREFIX } from '../utils/index';

// choices: [
//   { value: 'react', name: 'react ts template' },
//   { value: 'vite-react-ts', name: 'vite react-ts template (vite 模版)' },
//   { value: 'npm', name: 'npm template (适用于 npm 包)' },
//   { value: 'node-ts', name: 'egg-node-ts template (egg-ts 模版)' },
// ],
/**
 * 选择模板
 */
const TEMPLATE: templateInfo[] = [
  {
    name: 'react ts template',
    npmName: '@developer-once/react-template',
    version: '1.0.0',
    framework: 'react',
    language: 'ts',
  },
  {
    name: 'vite react-ts template (vite 模版)',
    npmName: '@developer-once/vite-ts-template',
    version: '1.0.0',
    framework: 'react',
    language: 'ts',
  },
  {
    name: 'npm template (适用于 npm 包)',
    npmName: '@developer-once/npm-template',
    version: '1.0.0',
    framework: null,
    language: 'js',
  },
  {
    name: 'egg-node-ts template (egg-ts 模版)',
    npmName: '@developer-once/node-egg-template',
    version: '1.0.0',
    framework: 'egg',
    language: 'ts',
  },
];

async function selectTemplate() {
  return inquirer
    .prompt({
      type: 'list',
      name: 'npmName',
      choices: TEMPLATE.map((item) => ({
        name: item.name,
        value: item.npmName,
      })),
      message: '选择将要初始化的模版',
    })
    .then((answer) => answer.npmName);
}

async function inputName() {
  return inquirer
    .prompt({
      type: 'input',
      name: 'name',
      message: 'Project name',
      default: 'onecli',
      // 校验
      // validate(v: string) {
      //   return !!v;
      // },
    })
    .then((answer) => answer.name);
}

async function inputAuthor() {
  return inquirer
    .prompt({
      type: 'input',
      name: 'author',
      message: 'Author',
    })
    .then((answer) => answer.author);
}

async function inputVersion() {
  return inquirer
    .prompt({
      type: 'input',
      name: 'version',
      message: 'version',
      default: '1.0.0',
    })
    .then((answer) => answer.version);
}

async function inputDescription() {
  return inquirer
    .prompt({
      type: 'input',
      name: 'description',
      message: '请输入描述',
    })
    .then((answer) => answer.description);
}

const init = async (git: boolean) => {
  const template = await selectTemplate();
  log.verbose('template', template);
  const name = await inputName();
  log.verbose('name', name);
  const author = await inputAuthor();
  log.verbose('author', author);
  // 项目的 version
  const version = await inputVersion();
  log.verbose('version', version);
  const description = await inputDescription();
  log.verbose('description', description);
  const selectedTemplate = TEMPLATE.filter((item) => item.npmName === template)[0];
  const spinner = ora('Loading...').start();
  try {
    await installPackage(selectedTemplate.npmName, selectedTemplate.version);
    await copyTemplate(name, selectedTemplate.npmName, author, version, description);
    if (!git) {
      await gitInitialize(name);
    }
    spinner.succeed('项目创建成功!');
  } catch (e: any) {
    log.verbose(PREFIX, e.message);
    spinner.fail('项目创建失败!');
  }
};

export default init;
