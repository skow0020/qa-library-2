import { screen, within } from '@testing-library/react';

export const clickDropdown = async (user, dropdownLabelText, optionText) => {
    const languageSelect = screen.getByLabelText(dropdownLabelText);
    await user.click(languageSelect)
    const python = screen.getByText(optionText)
    await user.click(python)
    expect(within(languageSelect).getByText(optionText)).toBeInTheDocument()
}

export const getByTextboxName = (name) => {
    return screen.getByRole('textbox', { name: name });
}
