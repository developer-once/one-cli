export default (pascalName: string) => `
import React from 'react';

import './index.less';

interface I${pascalName}Props {
}

const ${pascalName} = (props: I${pascalName}Props) => {

  return (
    <div className="${pascalName}">
    </div>
  )
}

export default ${pascalName};
`;
