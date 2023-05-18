import ora from 'ora';
import { TEMPLATE } from '../template/index';
import {
  copyTemplate,
  gitInitialize,
  installPackage,
  PREFIX,
  log,
} from '../utils/index';
import {
  selectTemplate,
  inputName,
  inputAuthor,
  inputVersion,
  inputDescription,
} from '../utils/checkInfo';

const init = async (git: boolean) => {
  const template: string = await selectTemplate();
  log.verbose('template', template);

  const name: string = await inputName();
  log.verbose('name', name);

  const author = await inputAuthor();
  log.verbose('author', author);

  // 项目的 version
  const version: string = await inputVersion();
  log.verbose('version', version);

  const description: string = await inputDescription();
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
