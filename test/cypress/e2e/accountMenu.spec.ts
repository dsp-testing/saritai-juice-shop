describe('/account menu', () => {
  describe('as authenticated user', () => {
    beforeEach(() => {
      cy.login({ email: 'admin', password: 'admin123' })
      cy.visit('/#/')
    })

    it('should show account menu button', () => {
      cy.get('button[aria-label*="Account"]').should('be.visible')
    })

    it('should open account menu when clicked', () => {
      cy.get('button[aria-label*="Account"]').click()
      cy.get('mat-menu').should('be.visible')
    })

    it('should have link to orders and payment', () => {
      cy.get('button[aria-label*="Account"]').click()
      cy.wait(500)
      cy.get('button, a').should('contain', 'Orders')
    })

    it('should have link to privacy and security', () => {
      cy.get('button[aria-label*="Account"]').click()
      cy.wait(500)
      cy.get('button, a').should('contain', 'Privacy')
    })

    it('should have logout option', () => {
      cy.get('button[aria-label*="Account"]').click()
      cy.wait(500)
      cy.get('button').contains('Logout').should('be.visible')
    })

    it('should logout when clicking logout button', () => {
      cy.get('button[aria-label*="Account"]').click()
      cy.wait(500)
      cy.get('button').contains('Logout').click()
      cy.wait(500)
      cy.get('button').contains('Login').should('be.visible')
    })
  })

  describe('as unauthenticated user', () => {
    beforeEach(() => {
      cy.visit('/#/')
    })

    it('should show login button', () => {
      cy.get('button').contains('Login').should('be.visible')
    })

    it('should not show account menu', () => {
      cy.get('button[aria-label*="Account"]').should('not.exist')
    })
  })
})
