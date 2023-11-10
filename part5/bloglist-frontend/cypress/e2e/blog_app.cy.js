describe('Blog app', () => {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'daboss',
      username: 'root',
      password: 'sekret'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  it('front page can be opened', () => {
    cy.contains('Blogs')
  })

  it('can open the login form and login', () => {
    cy.contains('Login').click()
    cy.get('#username').type('root')
    cy.get('#password').type('sekret')
    cy.get('#login-button').click()

    cy.contains('daboss logged in')
  })

  it('login fails with the wrong password', () => {
    cy.contains('Login').click()
    cy.get('#username').type('root')
    cy.get('#password').type('wrongpassword')
    cy.get('#login-button').click()

    cy.get('.error')
      .should('contain', 'Invalid login')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')

    cy.get('html').should('not.contain', 'daboss logged in')
  })

  describe('when logged in', () => {
    beforeEach(() => {
      cy.login({ username: 'root', password: 'sekret' })
    })

    it('a new note can be created', () => {
      cy.contains('Create blog').click()
      cy.contains('Create a new blog')
      cy.get('#title').type('Hello World!')
      cy.get('#author').type('Pete Ross')
      cy.get('#url').type('http://outerspace.com')
      cy.get('#create-button').click()

      cy.contains('Title: Hello World! Author: Pete Ross')

      cy.get('.success')
        .should('contain', 'A new blog: Hello World! by Pete Ross was created')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')
    })

    describe('and a note exists', () => {
      beforeEach(() => {
        cy.createBlog({ title: 'Cypress', author: 'E2E testing', url: 'http://youwin123.com' })
      })

      it('the view button can be clicked', () => {
        cy.get('#Cypress').click()
        cy.contains('http://youwin123.com')
      })
    })
  })
})