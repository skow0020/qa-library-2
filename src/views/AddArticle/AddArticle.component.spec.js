import AddArticle from './AddArticle';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { clickDropdown } from 'testHelpers/rtlHelpers';

describe('AddArticle Unit Tests', () => {
  test('AddArticle renders', async () => {
    const user = userEvent.setup()
    render(<AddArticle />);

    screen.getByRole('heading', { name: 'Add an Article' });
    const title = screen.getByRole('textbox', { name: "Title" });
    fireEvent.change(title, { target: { value: 'good omens' } })
    expect(title.value).toBe('good omens')

    const author = screen.getByRole('textbox', { name: "Author" });
    fireEvent.change(author, { target: { value: 'Neil Gaiman' } })
    expect(author.value).toBe('Neil Gaiman')

    await clickDropdown(user, 'Language', 'Python')
    await clickDropdown(user, 'Category', 'UI Automation')

    const url = screen.getByRole('textbox', { name: "URL" });
    fireEvent.change(url, { target: { value: 'http://www.goodomens.com' } })
    expect(url.value).toBe('http://www.goodomens.com')

    const backgroundImage = screen.getByRole('textbox', { name: "Background Image" });
    backgroundImage.value = 'backgroundImage';

    const description = screen.getByRole('textbox', { name: "Description" });
    description.value = 'description';

    const submit = screen.getByRole('button', { name: 'Submit' });
    fireEvent.click(submit);
  });
});