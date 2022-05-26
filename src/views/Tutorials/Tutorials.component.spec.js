import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { BrowserRouter as Router } from 'react-router-dom'
import { tutorials } from 'testHelpers/data'
import { clickDropdown } from 'testHelpers/rtlHelpers'
import { libraryAPI, server } from 'testHelpers/server'
import Tutorials from './Tutorials'

describe('Tutorials Unit Tests', () => {
  test('Tutorials renders', async () => {
    server.use(
      rest.get(libraryAPI('tutorials'), (req, res, ctx) => { return res(ctx.json(tutorials)) })
    )
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