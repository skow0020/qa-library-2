import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter as Router } from 'react-router-dom'
import { clickDropdown } from 'testHelpers/rtlHelpers'
import Tutorials from './Tutorials'

describe('Tutorials Unit Tests', () => {
  test('Tutorials renders', async () => {
    const user = userEvent.setup()

    render(
      <Router>
        <Tutorials />
      </Router>)

    await screen.findByText('Tutorials')
    screen.getByRole('button', { name: 'Add Tutorial' })
    await screen.findAllByText('How to sand a hippo')

    await clickDropdown(user, 'Category', 'General')
    await clickDropdown(user, 'Language', 'Swift')
    await waitForElementToBeRemoved(() => screen.queryByText('Python'))
    expect(screen.getByText('Swift')).toBeInTheDocument()
  })
})