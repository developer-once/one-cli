import inquirer from 'inquirer';
import path from 'path';
import fs from 'fs-extra';
import { page, component, i18n } from '../template/index';
import config from '../config';


const create = () => {
  const question = [
    // --- 模版 ---
    {
      type: 'list',
      name: 'template',
      choices: [
        { value: 'page', name: 'react page (react 项目中 Page 模版)' },
        { value: 'component', name: 'react component' },
        { value: 'i18n', name: 'i18n file (react 项目中多语言文件)' },
      ],
      default: ['react'],
      message: '选择将要创建的模块，选择 page 的时候会默认创建同名 i18n 文件',
    },
    // --- 名称 ---
    {
      type: 'input',
      name: 'name',
      message: 'init name',
      default: 'test',
    },
  ];
  
  inquirer.prompt(question).then(async (answers) => {
    let {
      name,
      template,
    } = answers;
    name.replace(name[0], name[0].toUpperCase());
    /**
     * 获取模版
     */
    const getTemplate = (type: string) => {
      switch (type) {
        case 'page':
          return page;
        case 'component':
          return component;
        case 'i18n':
          return i18n;
        default:
          return page;
      }
    };
    /**
     * 生成组件文件
     */
    const buildCpsFiles = (type: string) => {
      let fullPath = path.join(path.resolve(process.cwd(), (config as any).template[template]));
      fullPath = type === 'i18n' ?  fullPath : `${fullPath}/${name}`;
      const fileList = getTemplate(type);
      // 检查文件夹是否存在
      fs.ensureDirSync(fullPath);
      fileList.forEach((item) => {
        const filePath = `${fullPath}/${item.name.replace('NAME', name)}`;
        fs.outputFileSync(filePath, item.file(name));
      });
    };
  
    buildCpsFiles(template);
    // --- page 的时候默认创建 i18n ---
    if (template === 'page') {
      template = 'i18n';
      buildCpsFiles('i18n');
    }
  });
};

export default create;
