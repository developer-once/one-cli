// @ts-nocheck
// --- 入口文件 ---
// --- 生成 Services ---
import inquirer from 'inquirer';
import { generateService } from './openApi';
import { log } from '../../utils/index';


async function inputSchemaPath() {
  return inquirer
    .prompt([
      {
        type: 'input',
        name: 'schemaPath',
        message: `请输入 OpenAPI 3.0 的地址, 默认为 https://petstore.swagger.io/v2/swagger.json`,
      },
    ])
    .then((answer) => answer.schemaPath);
}

async function inputServersPath() {
  return inquirer
    .prompt([
      {
        type: 'input',
        name: 'serversPath',
        message: `请输入生成的 Services 的路径, 默认为 ./src/services`,
      },
    ])
    .then((answer) => answer.serversPath);
}

const openAPI = async () => {
  const schemaPath = await inputSchemaPath() || "https://petstore.swagger.io/v2/swagger.json";
  log.verbose('schemaPath', schemaPath);

  const serversPath = await inputServersPath() || "./src/services";
  log.verbose('serversPath', serversPath);

  generateService({
    schemaPath,
    serversPath,
  });
};

export default openAPI;