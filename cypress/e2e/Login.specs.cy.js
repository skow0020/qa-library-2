import { login, setViewport, sizes } from '../support/helpers'

context('Login scenarios', () => {
  sizes.forEach((size) => {
    it(`Able to log in - ${size}`, () => {
      setViewport(size)
      cy.openEyes()
      cy.eyesCheck()
      
      login()
      
      cy.url().should('contain', 'qa-dashboard')
    })
  })
})
