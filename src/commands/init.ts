import inquirer from 'inquirer';
import downloadReport from '../utils/index';
import config from '../config';

const init = () => {
  const question = [
    // --- 模版 ---
    {
      type: 'list',
      name: 'template',
      choices: [
        { value: 'react', name: 'react ts template' },
        { value: 'vite-react-ts', name: 'vite react-ts template (vite 模版)' },
        { value: 'npm', name: 'npm template (适用于 npm 包)' },
        { value: 'node-ts', name: 'egg-node-ts template (egg-ts 模版)' },
      ],
      default: [
        'react',
        'vite-react-ts',
        'npm',
        'node-ts',
      ],
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
    },
  ];

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
};

export default init;
