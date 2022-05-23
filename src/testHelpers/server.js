import { createServer as createMirageServer } from 'miragejs'
import { articles } from '../views/Articles/testData'
import { books } from '../views/Books/testData'
import { resourceLinks } from '../views/ResourceLinks/testData'
import { exampleRepos } from '../views/ExampleRepos/testData'
import { tutorials } from '../views/Tutorials/testData'

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