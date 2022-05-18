import { BrowserRouter as Router } from 'react-router-dom';
import { clickDropdown } from 'testHelpers/rtlHelpers';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import Articles from './Articles';
import { articles } from './testData';

describe('Articles Unit Tests', () => {
  test('Articles renders and filters', async () => {
    const user = userEvent.setup()

    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(articles)
      })
    );

    render(
      <Router>
        <Articles />
      </Router>
    );

    await screen.findByText('Articles')
    screen.findByText('button', 'Add Article')
    await clickDropdown(user, 'Category', 'General')
    await clickDropdown(user, 'Language', 'Swift')
    expect(screen.queryByText('Python')).toBeNull()
  });
});