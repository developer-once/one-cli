import tplMd from './tpl-index.md';
import tplComponent from './tpl-component.tsx';
import tplIndex from './tpl-index.ts';
import tplCss from './tpl-index.less';
import tplPage from './tpl-page.tsx';
import tplI18n from './tpl-i18n.js';
import type { templateInfo } from '../type/index';

export const page = [
  {
    file: tplPage,
    name: 'NAME.tsx',
  },
  {
    file: tplCss,
    name: 'index.less',
  },
  {
    file: tplIndex,
    name: 'index.ts',
  },
];

export const component = [
  {
    file: tplComponent,
    name: 'index.tsx',
  },
  {
    file: tplMd,
    name: 'index.md',
  },
  {
    file: tplCss,
    name: 'index.less',
  },
];

export const i18n = [
  {
    file: tplI18n,
    name: '/zh_CN/NAME.ts',
  },
  {
    file: tplI18n,
    name: '/en_US/NAME.ts',
  },
];

/**
 *  init
 */
export const TEMPLATE: templateInfo[] = [
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

// --- create ---
export const question = [
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
