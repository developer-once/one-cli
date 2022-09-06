# one-cli

## 快速上手

one-cli 的使用相当简单，全局安装 one-cli 工具 ，并直接根据需要执行 init/create 命令

```bash
npm i @developer-once/onecli -g

mkdir myapp && cd myapp

# 当前文件路径下 初始化项目
one init

# 当前文件路径下 创建模块
one create
```

### init

首先对 `one-cli init` 功能的定义是开发者直接使用 init 命令进行项目的初始化。希望能通过 cli 这种统一的入口生成的项目，保持对团队初始化模板的统一和节省团队成员对项目初始化配置的大量时间。

<div style="text-align: center; color: #8A8F8D;">
  <img  src="https://cdn.dev-one.cn/one-cli%20init.png?imageMogr2/thumbnail/600x600"/>
  <div>one init 在当前路径下初始化项目</div>
</div>

one-cli 提供的 `init` 命令依赖于 [download-git-repo](https://www.npmjs.com/package/download-git-repo) 会根据使用者的选择 download 对应的代码仓库到本地。（请确保本地配置好 node 环境与 git）


### create

`one create` 功能定位主要是在开发的过程中需要添加新的 页面/组件/i18n 或其他新增文件，使用者可以通过 `one create` 完成对所需模块的新增。

<div style="text-align: center; color: #8A8F8D;">
  <img  src="https://cdn.dev-one.cn/one-cli%20create.png?imageMogr2/thumbnail/600x600"/>
  <div>one create 在当前路径下创建对应模块</div>
</div>

### init

首先对 `one init` 功能的定义是开发者直接使用 `init` 命令进行项目的初始化。希望能通过  `one init` 命令保持对团队初始化模板的统一和节省团队成员对项目初始化配置的大量时间。


```
# 在当前目录下直接创建新项目
one init
```

![one-cli init](https://cdn.dev-one.cn/one-cli%20init.png)

one-cli 提供的 `init` 命令依赖于 [download-git-repo](https://www.npmjs.com/package/download-git-repo)，`init` 会根据使用者的输入 download 对应的代码仓库到本地。（请确保本地配置好 node 环境与 git）

### create

`one create` 功能主要是在开发的过程中需要添加新的 页面/组件/i18n 或其他新增文件，使用者可以通过 `one create` 完成对所需模块的新增

![one-cli create](https://cdn.dev-one.cn/one-cli%20create.png)

与 `init` 命令 不同的是，`create` 命令主要是直接在本地写入 template 文件夹中的内容完成的。



## 开发

我们将 one-cli 打造成一款通用的 cli 工具，目前提供 init 与 create 命令。开发者可以通过简单的修改完成自己的 cli 定制。

### 目录结构

```
├── bin                                 // bin 目录
│   └── init.js                         // 执行命令行 commander，例如 one init 、one create
├── src
│   ├── commands                        // commands 具体实现
│   │   ├── create.ts                   // create 功能
│   │   └── init.ts                     // init 功能
│   ├── config.json                     // 可以在这里新增 template address
│   ├── template                        // template file
│   │   ├── index.ts
│   │   ├── tpl-component.tsx.ts
│   │   ├── tpl-i18n.js.ts
│   │   ├── tpl-index.less.ts
│   │   ├── tpl-index.md.ts
│   │   ├── tpl-index.ts.ts
│   │   └── tpl-page.tsx.ts
│   └── utils
│       └── index.ts
```

以 `init` 功能为例，其主要功能在 /src/commands/init.ts 下,

1. 可以通过修改 question 中的 template 的 choices 中新增选项作为用户在执行 init 命令是交互询问时候的选择。
2. 之后在 /src/config.json 中新增对应的 choices[item].value 的配置，就可以完成对 init 命令的定制化改造，以符合开发者的团队实际需求。
3. 同时 question 中我们提供了一些项目基础信息的输入配置，可以在 question 中新增新的问题完成更适合团队需求的配置。

```js
import inquirer from 'inquirer';
// ----- template 配置仓库 -----
import config from '../config.json';
// ----- clone git 仓库与修改 package.json -----
import downloadReport from '../utils/index';

const question = [
  // --- 模版 ---
  {
    type: 'list',
    name: 'template',
    choices: [
      // ---- 在此处新增模版 ----
      { value: 'vite-react-ts', name: 'vite react-ts template (vite 模版)' },
    ],
    default: ['vite-react-ts'],
    message: '选择将要初始化的模版',
  },
  // ... 其余配置项目
];
// ---- cli 会根据输入去 clone 对应的仓库 ----
inquirer.prompt(question).then(async (answers) => {
  const {
    template,
    // --- question 中添加对应配置 ---
    name,
    description,
    author,
    version,
  } = answers;
  await downloadReport((config as any)[template].url, name, description, author, version);
});


```

### bin name

bin name 是 cli 工具在使用者本地环境命令行中触发命令，可以通过 package.json 中的 "bin" 进行修改来实现自定义，此处可以将 "one" 修改成任意的关键词 xxx，之后在命令行中的使用就变成 `xxx init `或 `xxx create`

<div style="text-align: center; color: #8A8F8D;">
  <img  src="https://cdn.dev-one.cn/bin-name.png?imageMogr2/thumbnail/400x400"/>
  <div>修改 package.json 中的 bin</div>
</div>



### 测试

在完成本地开发之后执行 npm run build 打包，会在 lib 下生成打包的结果，在 cli 项目的根目录下执行 npm link 命令将本地开发包链接到全局，这样可以模拟真实发布到 npm 之后本地 install -g 的效果。

```
# 添加链接
npm link

# 验证
one -V
// 会输出 package.json 中的version: 1.0.0
// 此处有输出证明 npm link 执行成功

# 取消链接
npm unlink <package-name>
```

### 发布

在本地打包验证完之后，可以通过 npm publish 的方式发布到 私有/公共 npm 仓库中，这样你的 cli 工具就可以被其他小伙伴通过 npm 的方式安装到本地，方便的使用啦。

```
npm run build

npm publish
```