import { BrowserRouter as Router } from 'react-router-dom';
import { clickDropdown } from 'testHelpers/rtlHelpers';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { createServer } from "testhelpers/server"

import Articles from './Articles';
import { articles } from './testData';

let server

beforeEach(() => {
  server = createServer
})

afterEach(() => {
  server.shutdown()
})

describe('Articles Unit Tests', () => {
  test('Articles renders and filters', async () => {
    const user = userEvent.setup()
    server.get("/articles", () => articles)

    render(
      <Router>
        <Articles />
      </Router>
    );
    await screen.findByText('Articles')
    screen.getByRole('button', { name: 'Add Article' })
    screen.getAllByText('How to sand a hippo')

    await clickDropdown(user, 'Category', 'General')
    await screen.findAllByText('How to sand a hippo')
    await clickDropdown(user, 'Language', 'Swift')
    await screen.findAllByText('How to sand a hippo')
    expect(screen.queryByText('Python')).not.toBeInTheDocument()
    expect(screen.getByText('Swift')).toBeInTheDocument()
  });
});