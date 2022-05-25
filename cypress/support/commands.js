// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import * as sideBar from '../components/sideBar.json'
import * as common from '../pages/Common.json'

Cypress.Commands.add('navigate', (page, size) => {
  if (!Cypress._.isArray(size)) {
    cy.get(common.navLink).click()
    cy.get(`#right-sidebar ${sideBar[page]}`).click()
  }
  else cy.get(sideBar[page]).click()
  cy.get(common.pageTitle).should('have.text', page)
})

Cypress.Commands.add('isFirefox', () => {
  return Cypress.isBrowser('Firefox')
})
