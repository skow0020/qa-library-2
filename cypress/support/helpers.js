import * as loginView from '../selectors/Login.json'

export const sizes = ['iphone-6', [1024, 768]]

export const setViewport = (size) => {
  if (Cypress._.isArray(size)) {
    cy.viewport(size[0], size[1])
  } else {
    cy.viewport(size)
  }
}

export const login = () => {
  cy.visit('library-login')
  cy.focused().should('have.id', 'email')
  cy.get(loginView.email).type('cskow@tapqa.com')
  cy.get(loginView.password).type('password')
  cy.get(loginView.submit).click()
}

export const selectDropdown = (dropdown, selection) => {
  cy.get(dropdown).click()
  cy.get(`li[data-value="${selection}"]`).click()
}