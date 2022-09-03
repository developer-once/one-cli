import inquirer from 'inquirer';
import downloadReport from '../utils/index';
import config from '../config';

const init = (data: Array<string>) => {
  const question = [
    // --- 模版 ---
    {
      type: 'list',
      name: 'template',
      choices: [
        { value: 'vite-react-ts', name: 'vite react-ts template (vite 模版)' },
      ],
      default: ['vite-react-ts'],
      message: '选择将要初始化的模版',
    },
    // --- 名称 ---
    {
      type: 'input',
      name: 'name',
      message: 'Project name',
      default: 'onecli',
    },
    // --- 描述 ---
    {
      type: 'input',
      name: 'description',
      message: 'Project description',
    },
    // --- 作者 ---
    {
      type: 'input',
      name: 'author',
      message: 'Author',
    },
    // --- 版本号 ---
    {
      type: 'input',
      name: 'version',
      message: 'version',
      default: '1.0.0',
  }];
  inquirer.prompt(question).then(async (answers) => {
    const {
      name,
      template,
      description,
      author,
      version,
    } = answers;
    await downloadReport((config as any)[template].url, name, description, author, version);
  });
  
}

export default init;
