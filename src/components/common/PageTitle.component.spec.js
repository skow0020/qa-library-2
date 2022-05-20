import PageTitle from './PageTitle'
import { render, screen } from '@testing-library/react'

describe('PageTitle Unit Tests', () => {
  it('PageTitle renders', () => {
    render(<PageTitle title="Add an Article" />)

    const linkElement = screen.getByText(/Add an Article/i)
    expect(linkElement).toBeInTheDocument()
  })
})