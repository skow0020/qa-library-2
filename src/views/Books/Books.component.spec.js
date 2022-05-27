import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { BrowserRouter as Router } from 'react-router-dom'
import { books } from 'testHelpers/data'
import { clickDropdown } from 'testHelpers/rtlHelpers'
import { libraryAPI, server } from 'testHelpers/server'
import Books from './Books'

describe('Books Unit Tests', () => {
  test('Books renders and filters', async () => {
    server.use(
      rest.get(libraryAPI('books'), (req, res, ctx) => { return res(ctx.json(books)) })
    )
    const user = userEvent.setup()

    render(
      <Router>
        <Books />
      </Router>
    )

    await screen.findByText('Books')
    screen.getByRole('button', { name: 'Add Book' })
    await screen.findAllByText('How to sand a hippo')

    screen.findByText('Python')
    await clickDropdown(user, 'Category', 'General')
    await clickDropdown(user, 'Language', 'Swift')
    await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'))
    expect(screen.getByText('Swift')).toBeInTheDocument()
    expect(screen.queryByText('Python')).not.toBeInTheDocument()
  })

  test('-Books filter returns empty', async () => {
    server.use(
      rest.get(libraryAPI('books'), (req, res, ctx) => {
        return res(ctx.json({ data: [] }))
      })
    )

    render(
      <Router>
        <Books />
      </Router>
    )
    await screen.findByText('Books')
    screen.getByRole('button', { name: 'Add Book' })
    await screen.findByText('No books match filter')
  })
})