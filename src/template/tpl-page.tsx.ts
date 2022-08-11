export default (pascalName: string) => `
import React, { useState } from 'react';
import { observer } from 'mobx-react';
import Store from './store';

import language from 'src/lang';
import './index.less';

const ${pascalName}FC: React.FC = () => {
  const [store] = useState(new Store());
  const { loading } = store;

  return (
    <div className="${pascalName}-wrap">
    </div>
  )
}


export default observer(${pascalName}FC);
`;
