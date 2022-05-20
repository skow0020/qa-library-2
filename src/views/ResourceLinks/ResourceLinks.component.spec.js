import { BrowserRouter as Router } from 'react-router-dom';
import { clickDropdown } from 'testHelpers/rtlHelpers';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { createServer } from '../../testHelpers/server';

import ResourceLinks from './ResourceLinks';
import { resourceLinks } from './testData';

let server

beforeEach(() => {
  server = createServer
})

afterEach(() => {
  server.shutdown()
})

describe('ResourceLinks Unit Tests', () => {
  test('ResourceLinks renders', async () => {
    const user = userEvent.setup()
    server.get("/resourceLinks", () => resourceLinks)

    render(
      <Router>
        <ResourceLinks />
      </Router>);
      
    await screen.findByText('ResourceLinks')
    screen.getByRole('button', { name: 'Add Resource Link' })
    screen.getAllByText('How to sand a hippo')
    await clickDropdown(user, 'Language', 'Swift')
    await screen.findAllByText('How to sand a hippo')
    await clickDropdown(user, 'Category', 'General')
    
    await screen.findAllByText('How to sand a hippo')
    expect(screen.queryByText('Python')).not.toBeInTheDocument()
    expect(screen.getByText('Swift')).toBeInTheDocument()
  });
});