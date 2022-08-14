import tplMd from './tpl-index.md';
import tplComponent from './tpl-component.tsx';
import tplIndex from './tpl-index.ts';
import tplCss from './tpl-index.less';
import tplPage from './tpl-page.tsx';
import tplI18n from './tpl-i18n.js';

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
