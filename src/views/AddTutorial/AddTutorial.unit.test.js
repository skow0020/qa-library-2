import AddBook from './AddBook';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { clickDropdown, getByTextboxName } from 'testHelpers/rtlHelpers';

describe('AddBook Unit Tests', () => {
  test('AddBook renders', async () => {
    const user = userEvent.setup()
    render(<AddBook />);

    screen.getByRole('heading', { name: 'Add a Book' });
    const title = getByTextboxName('Title')
    await user.type(title, 'good omens')
    expect(title.value).toBe('good omens')

    await clickDropdown(user, 'Language', 'Python')
    await clickDropdown(user, 'Category', 'UI Automation')

    const url = getByTextboxName('URL')
    await user.type(url, 'http://www.goodomens.com')
    expect(url.value).toBe('http://www.goodomens.com')

    const backgroundImage = getByTextboxName('Background Image');
    await user.type(backgroundImage, 'backgroundImage')
    expect(backgroundImage.value).toBe('backgroundImage');

    const description = getByTextboxName('Description');
    await user.type(description, 'description')
    expect(description.value).toBe('description');

    const submit = screen.getByRole('button', { name: 'Submit' });
    user.click(submit)
    //Check network??
  }, 10000);
});