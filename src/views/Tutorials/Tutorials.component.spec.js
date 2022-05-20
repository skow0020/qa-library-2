import { BrowserRouter as Router } from 'react-router-dom'
import { clickDropdown } from 'testHelpers/rtlHelpers'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createServer } from '../../testHelpers/server'

import Tutorials from './Tutorials'
import { tutorials } from './testData'

let server

beforeEach(() => {
  server = createServer
})

afterEach(() => {
  server.shutdown()
})

describe('Tutorials Unit Tests', () => {
  test('Tutorials renders', async () => {
    const user = userEvent.setup()
    server.get('/tutorials', () => tutorials)

    render(
      <Router>
        <Tutorials />
      </Router>)

    await screen.findByText('Tutorials')
    screen.getByRole('button', { name: 'Add Tutorial' })
    screen.getAllByText('How to sand a hippo')
    await clickDropdown(user, 'Language', 'Swift')
    await screen.findAllByText('How to sand a hippo')
    await clickDropdown(user, 'Category', 'General')

    await screen.findAllByText('How to sand a hippo')
    expect(screen.queryByText('Python')).not.toBeInTheDocument()
    expect(screen.getByText('Swift')).toBeInTheDocument()
  })
})