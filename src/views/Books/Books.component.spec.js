import { BrowserRouter as Router } from 'react-router-dom';
import { clickDropdown } from 'testHelpers/rtlHelpers';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { createServer } from "miragejs"

import Books from './Books';
import { books } from './testData';

let server

beforeEach(() => {
  server = createServer({
    environment: "dev",
    urlPrefix: "https://qa-library-dev.herokuapp.com/api",
  })
})

afterEach(() => {
  server.shutdown()
})

describe('Books Unit Tests', () => {
  test('Books renders', async () => {
    const user = userEvent.setup()
    server.get("/books", () => books)

    render(
      <Router>
        <Books />
      </Router>
    );

    await screen.findByText('Books')
    screen.getByRole('button', { name: 'Add Book' })
    screen.getAllByText('How to sand a hippo')
    await clickDropdown(user, 'Language', 'Swift')
    await screen.findAllByText('How to sand a hippo')
    await clickDropdown(user, 'Category', 'General')
    expect(screen.queryByText('Python')).toBeNull()
  });
});