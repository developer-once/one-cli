export default (pascalName: string) => `
import React, { useState } from 'react';

import language from 'src/lang';
import './index.less';

const ${pascalName}FC: React.FC = () => {
  const { loading } = store;

  return (
    <div className="${pascalName}-wrap">
    </div>
  )
}


export default ${pascalName}FC;
`;
