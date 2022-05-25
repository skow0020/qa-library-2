import { createServer as createMirageServer } from 'miragejs'
import { articles, books, exampleRepos, resourceLinks, tutorials } from './data'

export const createServer = () => {
    let server = createMirageServer({
        environment: 'test',
        urlPrefix: `${process.env.REACT_APP_ENV_URL}/api`,
    })

    server.get('/articles', () => articles)
    server.post('/articles', (schema, request) => {
        const article = JSON.parse(request.requestBody)
        return { success: true, post: article }
    })
    server.get('/books', () => books)
    server.post('/books', (schema, request) => {
        const book = JSON.parse(request.requestBody)
        return { success: true, post: book }
    })
    server.get('/resourceLinks', () => resourceLinks)
    server.post('/resourceLinks', (schema, request) => {
        const resourceLink = JSON.parse(request.requestBody)
        return { success: true, post: resourceLink }
    })
    server.get('https://api.github.com/users/skow0020/repos', () => exampleRepos)
    server.get('/tutorials', () => tutorials)
    server.post('/tutorials', (schema, request) => {
        const tutorial = JSON.parse(request.requestBody)
        return { success: true, post: tutorial }
    })

    return server
}