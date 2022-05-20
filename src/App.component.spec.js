import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Dash', () => {
  render(<App />);
  const library = screen.getAllByText(/^QA Library$/i);
  expect(library.length).toBe(2);
});
