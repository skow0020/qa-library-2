import { render, screen } from '@testing-library/react'
import MainFooter from './MainFooter'

describe('MainFooter Unit Tests', () => {
  it('MainFooter renders', () => {
    render(
      <MainFooter />
    )

    const label = screen.getByRole('link', { name: 'Colin Skow' })
    expect(label).toBeInTheDocument()
  })
})