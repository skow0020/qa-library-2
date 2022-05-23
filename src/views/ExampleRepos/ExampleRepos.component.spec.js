import ExampleRepos from './ExampleRepos'
import { clickDropdown } from 'testHelpers/rtlHelpers'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('ExampleRepos Unit Tests', () => {
  test('ExampleRepos renders', async () => {
    const user = userEvent.setup()

    render( <ExampleRepos />)

    await screen.findByText('Example Repos')
    await clickDropdown(user, 'Language', 'Java')
    // More validation
  })
})