import { createServer as createMirageServer } from 'miragejs'

export const createServer = createMirageServer({
    environment: 'test',
    urlPrefix: `${process.env.REACT_APP_ENV_URL}/api`,
})