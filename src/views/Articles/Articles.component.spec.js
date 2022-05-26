import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { BrowserRouter as Router } from 'react-router-dom'
import { articles } from 'testHelpers/data'
import { clickDropdown } from 'testHelpers/rtlHelpers'
import { libraryAPI, server } from 'testHelpers/server'
import Articles from './Articles'

describe('Articles Unit Tests', () => {
  test('Articles renders and filters', async () => {
    server.use(
      rest.get(libraryAPI('articles'), (req, res, ctx) => { return res(ctx.json(articles)) })
    )
    const user = userEvent.setup()

    render(
      <Router>
        <Articles />
      </Router>
    )

    await screen.findByText('Articles')
    screen.getByRole('button', { name: 'Add Article' })
    await screen.findAllByText('How to sand a hippo')

    await clickDropdown(user, 'Category', 'General')
    await clickDropdown(user, 'Language', 'Swift')
    await waitForElementToBeRemoved(() => screen.queryByText('Python'))
    expect(screen.getByText('Swift')).toBeInTheDocument()
  })

  test('-Articles filter returns empty', async () => {
    server.use(
      rest.get(libraryAPI('articles'), (req, res, ctx) => {
        return res(ctx.json({ data: [] }))
      })
    )

    render(
      <Router>
        <Articles />
      </Router>
    )
    await screen.findByText('Articles')
    screen.getByRole('button', { name: 'Add Article' })
    await screen.findByText('No articles match filter')
  })
})