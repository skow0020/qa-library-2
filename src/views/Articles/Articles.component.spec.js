import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter as Router } from 'react-router-dom'
import { clickDropdown } from 'testHelpers/rtlHelpers'
import Articles from './Articles'

describe('Articles Unit Tests', () => {
  test('Articles renders and filters', async () => {
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
})