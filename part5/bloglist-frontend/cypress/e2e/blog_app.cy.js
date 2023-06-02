describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'John Doe',
      username: 'admin',
      password: 'admin'
    }
    const user2 = {
      name: 'Jane Doe',
      username: 'admin2',
      password: 'admin2'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user2)
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.contains('Log in')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function () {
      cy.contains('Log in').click()
      cy.get('#username').type('admin')
      cy.get('#password').type('admin')
      cy.get('#login-button').click()
      cy.contains('Logged in as admin')
      cy.contains('admin logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('Log in').click()
      cy.get('#username').type('admin')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.contains('wrong username or password')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('Blog app', function() {
    describe('When logged in', function() {
      beforeEach(function() {
        cy.contains('Log in').click()
        cy.get('#username').type('admin')
        cy.get('#password').type('admin')
        cy.get('#login-button').click()
        cy.contains('Logged in as admin')
      })
      it('A blog can be created and liked', function() {
        cy.contains('new note').click()
        cy.get('#title').type('ctest')
        cy.get('#author').type('admin')
        cy.get('#url').type('localhost')
        cy.get('#create-button').click()
        cy.get('#ctest').contains('view').click()
        cy.get('#ctest').contains('0')
        cy.get('#ctest').get('#like-button').click()
        cy.get('#ctest').contains('1')
      })
      it('users can delete a blog', function() {
        cy.contains('new note').click()
        cy.get('#title').type('ctest1')
        cy.get('#author').type('admin')
        cy.get('#url').type('localhost')
        cy.get('#create-button').click()
        cy.get('#ctest1').contains('view').click()
        cy.get('#delete-button').click()
        cy.contains('ctest1').should('not.exist')
      })
      it('only creators can see the delete button of a blog', function() {
        cy.contains('new note').click()
        cy.get('#title').type('ctest2')
        cy.get('#author').type('admin')
        cy.get('#url').type('localhost')
        cy.get('#create-button').click()
        cy.contains('ctest2').contains('view').click()
        cy.get('#delete-button').should('exist')
        cy.contains('logout').click()
        cy.contains('Log in').click()
        cy.get('#username').type('admin2')
        cy.get('#password').type('admin2')
        cy.get('#login-button').click()
        cy.contains('admin2 logged in')
        cy.contains('ctest2').contains('view').click()
        cy.get('#delete-button').should('not.exist')
      })
      it('blogs are ordered according to likes', function() {
        cy.contains('new note').click()
        cy.get('#title').type('ctest1')
        cy.get('#author').type('admin')
        cy.get('#url').type('localhost')
        cy.get('#create-button').click()
        cy.contains('a new blog ctest1 by admin added')
        cy.contains('ctest1').contains('view').click()
        cy.get('#ctest1').get('.like-button').click()
        cy.wait(100)
        cy.get('#ctest1').get('.like-button').click()
        cy.wait(100)

        cy.contains('new note').click()
        cy.get('#title').type('ctest2')
        cy.get('#author').type('admin')
        cy.get('#url').type('localhost')
        cy.get('#create-button').click()
        cy.contains('a new blog ctest2 by admin added')
        cy.get('#ctest2').contains('view').click()
        cy.get('#ctest2').get('.like-button').eq(1).click()
        cy.wait(100)

        cy.contains('new note').click()
        cy.get('#title').type('ctest3')
        cy.get('#author').type('admin')
        cy.get('#url').type('localhost')
        cy.get('#create-button').click()
        cy.contains('a new blog ctest3 by admin added')
        cy.get('#ctest3').contains('view').click()
        cy.get('#ctest3').get('.like-button').eq(2).click()
        cy.wait(100)
        cy.get('#ctest3').get('.like-button').eq(2).click()
        cy.wait(100)
        cy.get('#ctest3').get('.like-button').eq(1).click()
        cy.wait(100)

        cy.get('.blog').eq(0).should('contain', 'ctest3')
        cy.get('.blog').eq(1).should('contain', 'ctest1')
        cy.get('.blog').eq(2).should('contain', 'ctest2')
      })
    })
  })
})