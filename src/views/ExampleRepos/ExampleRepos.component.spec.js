import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { exampleRepos } from 'testhelpers/data'
import { clickDropdown } from 'testHelpers/rtlHelpers'
import { server } from 'testHelpers/server'
import ExampleRepos from './ExampleRepos'


describe('ExampleRepos Unit Tests', () => {
  test('ExampleRepos renders and filters', async () => {
    server.use(
      rest.get('https://api.github.com/users/skow0020/repos', (req, res, ctx) => { return res(ctx.json(exampleRepos)) })
    )
    const user = userEvent.setup()

    render(<ExampleRepos />)

    await screen.findByText('Example Repos')
    await screen.findByRole('progressbar')
    const javascriptRepos = await screen.findAllByText('JavaScript')
    expect(javascriptRepos.length).toBe(1)
    await clickDropdown(user, 'Language', 'Java')
    const javaRepos = await screen.findAllByText('Java')
    expect(javaRepos.length).toBe(3)
    await waitForElementToBeRemoved(() => screen.queryAllByText('JavaScript'))
  })
})