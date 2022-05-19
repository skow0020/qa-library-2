import { screen, within } from '@testing-library/react';

export const clickDropdown = async (user, dropdownLabelText, optionText) => {
    const dropdown = screen.getByLabelText(dropdownLabelText);
    await user.click(dropdown)
    const option = screen.getByRole('option', { name: optionText })
    await user.click(option)
    within(dropdown).getByText(optionText)
}

export const getByTextboxName = (name) => {
    return screen.getByRole('textbox', { name: name });
}

export const setTextBoxValue = async (user, name, value) => {
    const textbox = getByTextboxName(name);
    await user.type(textbox, value);
    expect(textbox.value).toBe(value);
}
