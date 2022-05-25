import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter as Router } from 'react-router-dom'
import { clickDropdown } from 'testHelpers/rtlHelpers'
import ResourceLinks from './ResourceLinks'

describe('ResourceLinks Unit Tests', () => {
  test('ResourceLinks renders', async () => {
    const user = userEvent.setup()

    render(
      <Router>
        <ResourceLinks />
      </Router>)
      
    await screen.findByText('ResourceLinks')
    screen.getByRole('button', { name: 'Add Resource Link' })
    await screen.findAllByText('How to sand a hippo')

    await clickDropdown(user, 'Category', 'General')
    await clickDropdown(user, 'Language', 'Swift')
    await waitForElementToBeRemoved(() => screen.queryByText('Python'))
    expect(screen.getByText('Swift')).toBeInTheDocument()
  })
})