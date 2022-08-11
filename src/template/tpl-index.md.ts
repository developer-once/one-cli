export default (pascalName: string) => `
---
nav:
  path: /components
---

## ${pascalName}

## API

| 参数名 | 说明 | 必填 | 类型 | 默认值 | 备注 |
| ------  | ---- | ---- | ---- | ------ | ---- |
|      |       |     |     |        |      |

Demo:

本 Demo 演示一行文字的用法。

` + '```tsx' + `
import React from 'react';
import { ${pascalName} } from '@developer-ones/component';
  
export default () => {
  return (
    <div>
    </div>
  )
};
` + '```';
