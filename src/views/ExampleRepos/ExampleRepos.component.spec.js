import ExampleRepos from './ExampleRepos'
import { clickDropdown } from 'testHelpers/rtlHelpers'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createServer } from '../../testHelpers/server'
import { repos } from './testData'

let server

beforeEach(() => {
  server = createServer
})

afterEach(() => {
  server.shutdown()
})

describe('ExampleRepos Unit Tests', () => {
  test('ExampleRepos renders', async () => {
    const user = userEvent.setup()
    server.get('/https://api.github.com/users/skow0020/repos', () => repos)

    render( <ExampleRepos />)

    await screen.findByText('Example Repos')
    await clickDropdown(user, 'Language', 'Java')
    // More validation
  })
})