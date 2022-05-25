import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter as Router } from 'react-router-dom'
import { clickDropdown } from 'testHelpers/rtlHelpers'
import Books from './Books'

describe('Books Unit Tests', () => {
  test('Books renders and filters', async () => {
    const user = userEvent.setup()

    render(
      <Router>
        <Books />
      </Router>
    )

    await screen.findByText('Books')
    screen.getByRole('button', { name: 'Add Book' })
    await screen.findAllByText('How to sand a hippo')

    await clickDropdown(user, 'Category', 'General')
    await clickDropdown(user, 'Language', 'Swift')
    await waitForElementToBeRemoved(() => screen.queryByText('Python'))
    expect(screen.getByText('Swift')).toBeInTheDocument()
  })
})