describe('Blog app', () => {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'daboss',
      username: 'root',
      password: 'sekret',
    }

    const second_user = {
      name: 'slacker',
      username: 'slacker',
      password: 'password',
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, second_user)
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
        cy.createBlog({
          title: 'Cypress',
          author: 'E2E testing',
          url: 'http://youwin123.com',
        })
      })

      it('the view button can be clicked', () => {
        cy.get('#view-Cypress').click()
        cy.contains('http://youwin123.com')
      })

      it('the delete button is visible', () => {
        cy.get('.blog').contains('View').click()
        cy.get('.blog').should('contain', 'Delete')
      })

      it('the delete button can be clicked and confirmed if I created the blog', () => {
        cy.get('.blog').contains('View').click()
        cy.get('.blog').contains('Delete').click()
        cy.on('window:confirm', () => true)
        cy.should('not.contain', 'Cypress')
      })

      describe('and another note exists', () => {
        beforeEach(() => {
          cy.createBlog({
            title: 'Testing is fun',
            author: 'A bored developer',
            url: 'http://soccer.com',
            likes: 2,
          })
        })

        it.only('blogs are ordered by likes', () => {
          cy.get('.blog').eq(0).contains('Testing is fun')
          cy.get('.blog').eq(1).contains('View').click()
          cy.get('button').then((buttons) => {
            cy.wrap(buttons[9]).contains('Like').click()
            cy.wrap(buttons[9]).contains('Like').click()
            cy.wrap(buttons[9]).contains('Like').click()
          })
          cy.get('.blog').eq(0).contains('Cypress')
        })
      })
    })
  })

  describe('when logged in as another user', () => {
    beforeEach(() => {
      cy.login({ username: 'root', password: 'sekret' })
      cy.createBlog({
        title: 'Cypress',
        author: 'E2E testing',
        url: 'http://youwin123.com',
      })
      cy.login({ username: 'slacker', password: 'password' })
    })

    it('the delete button is not visible if I did not create the blog', () => {
      cy.get('.blog').contains('View').click()
      cy.get('.blog').should('not.contain', 'Delete')
    })
  })
})
