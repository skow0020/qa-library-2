import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { BrowserRouter as Router } from 'react-router-dom'
import { resourceLinks } from 'testHelpers/data'
import { clickDropdown } from 'testHelpers/rtlHelpers'
import { libraryAPI, server } from 'testHelpers/server'
import ResourceLinks from './ResourceLinks'

describe('ResourceLinks Unit Tests', () => {
  test('ResourceLinks renders', async () => {
    server.use(
      rest.get(libraryAPI('resourceLinks'), (req, res, ctx) => { return res(ctx.json(resourceLinks)) })
    )
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