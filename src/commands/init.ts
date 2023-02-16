import inquirer from 'inquirer';
import ora from 'ora';
import type { templateInfo } from '../type/index';
import downloadPackage from '../utils/index';

const Template: templateInfo[] = [
  {
    name: 'react ts template',
    npmName: '@developer-once/react-template',
    version: '1.0.0',
  },
];
const init = () => {
  // 选择项目模板
  const question = [
    // --- 模版 ---
    {
      type: 'list',
      name: 'npmName',
      choices: Template.map((item) => ({
        ...item,
        value: item.npmName,
      })),
      // choices: [
      //   { value: 'react', name: 'react ts template' },
      //   { value: 'vite-react-ts', name: 'vite react-ts template (vite 模版)' },
      //   { value: 'npm', name: 'npm template (适用于 npm 包)' },
      //   { value: 'node-ts', name: 'egg-node-ts template (egg-ts 模版)' },
      // ],
      message: '选择将要初始化的模版',
    },
    // --- 名称 ---
    {
      type: 'input',
      name: 'name',
      message: 'Project name',
      // default: 'onecli',
      validate(v: string) {
        return !!v;
      },
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
    const { npmName, name } = answers;
    const templateInfo = Template.filter((item) => item.npmName === npmName)[0];
    const spinner = ora('Loading').start();
    try {
      await downloadPackage(templateInfo, name);
    } catch (e) {
      console.error(e);
    } finally {
      spinner.stop();
    }
  });
};

export default init;
