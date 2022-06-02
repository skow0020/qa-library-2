import NotFound from '../../../src/components/common/NotFound'

describe('NotFound renders', () => {
  it('playground', () => {
    cy.mount(<NotFound />)
    cy.contains('Hmm... the page you are looking for seems to have disappeared... if it has ever existed')
  })
})