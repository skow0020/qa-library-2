import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { BrowserRouter as Router } from 'react-router-dom'
import { clickDropdown, setTextBoxValue } from 'testHelpers/rtlHelpers'
import { libraryAPI, server } from 'testHelpers/server'
import AddArticle from './AddArticle'

describe('AddArticle Unit Tests', () => {
  test('AddArticle renders', async () => {
    server.use(
      rest.post(libraryAPI('articles'), (req, res, ctx) => {
        return res(ctx.json({ success: true, post: req.body }))
      })
    )
    const user = userEvent.setup()
    render(
      <Router>
        <AddArticle />
      </Router>
    )

    screen.getByRole('heading', { name: 'Add an Article' })

    await setTextBoxValue(user, 'Title', 'good omens')
    await setTextBoxValue(user, 'Author', 'Neil Gaiman')

    await clickDropdown(user, 'Language', 'Python')
    await clickDropdown(user, 'Category', 'UI Automation')

    await setTextBoxValue(user, 'URL', 'http://www.goodomens.com')
    await setTextBoxValue(user, 'Background Image', 'backgroundImage')
    await setTextBoxValue(user, 'Description', 'description')

    const submit = screen.getByRole('button', { name: 'Submit' })
    user.click(submit)
    await screen.findByText('Article added successfully')
  }, 10000)
})