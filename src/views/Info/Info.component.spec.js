import Info from './Info';
import { render, screen } from '@testing-library/react';

describe('Info Unit Tests', () => {
  test('Info renders', async () => {
    render( <Info />);

    await screen.findByText('This site is a hub of resources for learning programming languages, tools, testing, and best practices across the industry')
  });
});