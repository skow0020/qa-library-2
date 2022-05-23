import { createServer as createMirageServer } from 'miragejs'
import { articles, books, resourceLinks, exampleRepos, tutorials } from './data'

export const createServer = () => {
    let server = createMirageServer({
        environment: 'test',
        urlPrefix: `${process.env.REACT_APP_ENV_URL}/api`,
    })

    server.get('/articles', () => articles)
    server.get('/books', () => books)
    server.get('/resourceLinks', () => resourceLinks)
    server.get('https://api.github.com/users/skow0020/repos', () => exampleRepos)
    server.get('/tutorials', () => tutorials)

    return server
}