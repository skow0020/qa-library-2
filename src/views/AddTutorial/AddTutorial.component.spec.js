import AddTutorial from './AddTutorial';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { clickDropdown } from 'testHelpers/rtlHelpers';
import { setTextBoxValue } from 'testHelpers/rtlHelpers';

describe('AddTutorial Unit Tests', () => {
  test('AddTutorial renders', async () => {
    const user = userEvent.setup()
    render(<AddTutorial />);

    screen.getByRole('heading', { name: 'Add a Tutorial' });
    await setTextBoxValue(user, 'Title', 'good omens');

    await clickDropdown(user, 'Language', 'Python')
    await clickDropdown(user, 'Category', 'UI Automation')

    await setTextBoxValue(user, 'URL', 'http://www.goodomens.com')
    await setTextBoxValue(user, 'Background Image', 'backgroundImage')
    await setTextBoxValue(user, 'Description', 'description')

    const submit = screen.getByRole('button', { name: 'Submit' });
    user.click(submit)
    //Check network??
  }, 10000);
});