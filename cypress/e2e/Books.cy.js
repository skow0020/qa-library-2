import * as addBook from '../selectors/AddBook.json'
import * as books from '../selectors/Books.json'
import * as common from '../selectors/Common.json'
import { selectDropdown, setViewport, sizes } from '../support/helpers'

context('Books', () => {
  beforeEach(() => {
    // cy.login()
    
    cy.visit('/')
    cy.openEyes()
  })

  sizes.forEach((size) => {
    it(`Navigate to Books and add one - ${size}`, () => {
      setViewport(size)
      cy.navigate('Books', size)

      cy.get(books.cardPosts).its('length').then(booksLength => {
        cy.get(books.addBook).click()
        cy.get(common.pageTitle).should('have.text', 'Add a Book')

        cy.fixture('books').then((books) => {
          const { title, author, url, backgroundImage, pdf, body, category } = books.data[0]
          cy.get(addBook.title).type(title).should('have.value', title)
          cy.get(addBook.author).type(author).should('have.value', author)
          cy.get(addBook.url).type(url).should('have.value', url)
          cy.get(addBook.backgroundImage).type(backgroundImage).should('have.value', backgroundImage)
          cy.get(addBook.pdfUrl).type(pdf).should('have.value', pdf)
          cy.get(addBook.description).type(body).should('have.value', body)
          selectDropdown(addBook.category, category)
          cy.get(addBook.category).should('have.text', category)
        })

        cy.eyesCheck()

        cy.get(common.submit).click()
        cy.get(common.alertModal).should('have.text', 'Book added successfully')

        cy.url().should('contain', 'books')
        cy.get(books.cardPosts).should('have.length', booksLength + 1)
      })
    })

    it(`Filter by category - ${size}`, () => {
      setViewport(size)
      cy.navigate('Books', size)

      selectDropdown(books.category, 'API Automation')
      cy.get(books.cardPosts).should('have.length.greaterThan', 0)
      selectDropdown(books.category, 'Databases')
      cy.get(books.cardPosts).should('have.length', 0)

      cy.eyesCheck()
    })

    it(`Filter by language - ${size}`, () => {
      setViewport(size)
      cy.navigate('Books', size)

      selectDropdown(books.language, 'CSharp')
      cy.get(books.cardPosts).should('have.length.greaterThan', 0)
      selectDropdown(books.language, 'Cpp')
      cy.get(books.cardPosts).should('have.length', 0)
    })
  })
})