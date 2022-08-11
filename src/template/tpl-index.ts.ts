export default (pascalName: string) => `
import { lazy } from 'react'

export default lazy(() => import('./${pascalName}'))
`;
