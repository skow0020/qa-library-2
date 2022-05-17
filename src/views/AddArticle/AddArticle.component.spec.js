import AddArticle from './AddArticle';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { clickDropdown, getByTextboxName } from 'testHelpers/rtlHelpers';

describe('AddArticle Unit Tests', () => {
  test('AddArticle renders', async () => {
    const user = userEvent.setup()
    render(<AddArticle />);

    screen.getByRole('heading', { name: 'Add an Article' });
    const title = getByTextboxName('Title')
    await user.type(title, 'good omens')
    expect(title.value).toBe('good omens')

    const author = getByTextboxName('Author')
    await user.type(author, 'Neil Gaiman')
    expect(author.value).toBe('Neil Gaiman')

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
  });
});