import LoadError from './LoadError'
import React from 'react'
import { render, screen } from '@testing-library/react'

it('LoadError renders with error message', () => {
  render(<LoadError error="Articles failed to load" />)
  const title = screen.getByText(/Something went wrong!/i)
  expect(title).toBeInTheDocument()

  const details = screen.getByText(/Articles failed to load/i)
  expect(details).toBeInTheDocument()
})

it('LoadError renders with no props', () => {
  render(<LoadError />)

  const title = screen.getByText(/Something went wrong!/i)
  expect(title).toBeInTheDocument()

  const details = screen.getByText(/Try refreshing maybe?/i)
  expect(details).toBeInTheDocument()
})