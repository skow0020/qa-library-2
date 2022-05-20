import QADashboard from './QADashboard'
import { render, screen } from '@testing-library/react'

describe('QADashboard Unit Tests', () => {
  test('QADashboard renders', async () => {
    render(<QADashboard />)

    screen.getByText('Behold! A library in which you can find everything you have ever wanted to search for!')
  })
})