import { render, screen } from '@testing-library/react'
import TextField from './TextField'

describe('TextField Unit Tests', () => {
  it('TextField renders', () => {
    render(
      <TextField id="navbar-search" label="Search for title" value='valued' onChange={jest.fn()} />
    )

    const label = screen.getByRole('textbox', { name: 'Search for title' })
    expect(label).toBeInTheDocument()
  })
})