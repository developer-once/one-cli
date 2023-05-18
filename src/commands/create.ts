import inquirer from 'inquirer';
import path from 'path';
import fs from 'fs-extra';
import config from '../config';
import {
  page,
  component,
  i18n,
  question,
} from '../template/index';

const create = () => {

  inquirer.prompt(question).then(async (answers) => {
    let { template } = answers;
    const { name } = answers;
    // 首字母大写
    name.replace(name[0], name[0].toUpperCase());

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

    // 生成文件
    const buildCpsFiles = (type: string) => {
      let fullPath = path.join(path.resolve(process.cwd(), (config as any).template[template]));
      fullPath = type === 'i18n' ? fullPath : `${fullPath}/${name}`;
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
