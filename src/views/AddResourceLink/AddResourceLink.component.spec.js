import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { BrowserRouter as Router } from 'react-router-dom'
import { clickDropdown, setTextBoxValue } from 'testHelpers/rtlHelpers'
import { libraryAPI, server } from 'testHelpers/server'
import AddResourceLink from './AddResourceLink'

describe('AddResourceLink Unit Tests', () => {
  test('AddResourceLink renders', async () => {
    server.use(
      rest.post(libraryAPI('articles'), (req, res, ctx) => {
        return res(ctx.json({ success: true, post: req.body }))
      })
    )
    const user = userEvent.setup()
    render(
      <Router>
        <AddResourceLink />
      </Router>
    )

    screen.getByRole('heading', { name: 'Add a Resource Link' })
    
    await setTextBoxValue(user, 'Title', 'good omens')

    await clickDropdown(user, 'Language', 'Python')
    await clickDropdown(user, 'Category', 'UI Automation')

    await setTextBoxValue(user, 'URL', 'http://www.goodomens.com')
    await setTextBoxValue(user, 'Background Image', 'backgroundImage')
    await setTextBoxValue(user, 'Description', 'description')

    const submit = screen.getByRole('button', { name: 'Submit' })
    user.click(submit)
    await screen.findByText('ResourceLink added successfully')
  }, 10000)
})