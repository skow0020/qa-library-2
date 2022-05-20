import { BrowserRouter as Router } from 'react-router-dom'
import { clickDropdown } from 'testHelpers/rtlHelpers'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createServer } from '../../testHelpers/server'

import Books from './Books'
import { books } from './testData'

let server

beforeEach(() => {
  server = createServer
})

afterEach(() => {
  server.shutdown()
})

describe('Books Unit Tests', () => {
  test('Books renders and filters', async () => {
    const user = userEvent.setup()
    server.get('/books', () => books)

    render(
      <Router>
        <Books />
      </Router>
    )

    await screen.findByText('Books')
    screen.getByRole('button', { name: 'Add Book' })
    screen.getAllByText('How to sand a hippo')
    await clickDropdown(user, 'Language', 'Swift')
    await screen.findAllByText('How to sand a hippo')
    await clickDropdown(user, 'Category', 'General')
    
    await screen.findAllByText('How to sand a hippo')
    expect(screen.queryByText('Python')).not.toBeInTheDocument()
    expect(screen.getByText('Swift')).toBeInTheDocument()
  })
})