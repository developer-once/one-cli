# one-cli

我们希望 one-cli 可以成为能帮助中小团队 **解决团队工程化的第一步**

one-cli 的目的是方便的将工程化能力中的 cli 工具🔧 以模版的形式提供给开发者，使得开发者可以轻松的 clone 下来之后经过简单的 修改/添加模版 之后就变成能解决团队痛点的专属定制工具。

----

## 快速上手

one-cli 的使用相当简单，首先创建/进入工程目录

```
mkdir myapp && cd myapp
```

然后就可以安装 one-cli 工具，并直接根据需要执行 init/create 命令

```
npm i @developer-ones/onecli -G

# 根目录下直接创建新项目
one init

# 项目内 创建新组件｜页面｜i18n
one create
```

## 开发

one-cli 作为一款通用的 cli 工具，目前提供两个命令 `init` 与 `create`。开发者可以通过简单的修改完成自己的 cli 定制

### init

首先对 `one init` 功能的定义是开发者直接使用 `init` 命令进行项目的初始化。希望能通过  `one init` 命令保持对团队初始化模板的统一和节省团队成员对项目初始化配置的大量时间。

one-cli 提供的 `init` 命令依赖于 [download-git-repo](https://www.npmjs.com/package/download-git-repo)，`init` 会根据使用者的输入 download 对应的代码仓库到本地。（请确保本地配置好 node 环境与 git）

`init` 主要功能在 /src/commands/init.ts 下, 

1. 可以通过修改 question 中的 template/choices 中新增选项作为用户在执行 cli 时候的选择。
2. 之后在 /src/config.json 中新增对应的 choices/value 的配置，就可以完成对 `init` 命令的定制化改造，以符合开发者的团队实际需求。

### create

`one create` 功能主要是在开发的过程中需要添加新的 页面/组件/i18n 或其他新增文件，使用者可以通过 `one create` 完成对所需模块的新增

create 命令主要功能在 /src/commands/create.ts 下，和 `init` 命令 不同的是，`create` 命令主要是直接在本地写入 template 文件中的内容完成的。

### 修改 bin name

bin name 是 cli 工具在使用者本地环境命令行中触发命令，可以通过 package.json 中的 bin 进行修改来实现自定义
