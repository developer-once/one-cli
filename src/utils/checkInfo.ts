import inquirer from 'inquirer';
import { TEMPLATE } from "../template";

export const selectTemplate = async () => {
  return inquirer
    .prompt<{
      npmName: string
    }>({
      type: 'list',
      name: 'npmName',
      choices: TEMPLATE.map((item) => ({
        name: item.name,
        value: item.npmName,
      })),
      message: '选择将要初始化的模版',
    })
    .then((answer: { npmName: any; }) => answer.npmName);
}

export const inputName = async  (): Promise<string> => {
  return inquirer
    .prompt<{ name: string }>({
      type: 'input',
      name: 'name',
      message: 'Project name',
      default: 'onecli',
    })
    .then((answer) => answer.name);
}

export const inputAuthor = async (): Promise<string> => {
  return inquirer
    .prompt<{ author: string }>({
      type: 'input',
      name: 'author',
      message: 'Author',
    })
    .then((answer) => answer.author);
}

export const inputVersion = async (): Promise<string> => {
  return inquirer
    .prompt<{ version: string }>({
      type: 'input',
      name: 'version',
      message: 'version',
      default: '1.0.0',
    })
    .then((answer) => answer.version);
}

export const inputDescription = async (): Promise<string> => {
  return inquirer
    .prompt<{ description: string }>({
      type: 'input',
      name: 'description',
      message: '请输入描述',
    })
    .then((answer) => answer.description);
}
