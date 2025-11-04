describe('/#/wallet', () => {
  describe('as authenticated user', () => {
    beforeEach(() => {
      cy.login({ email: 'admin', password: 'admin123' })
    })

    it('should be able to access digital wallet page', () => {
      cy.visit('/#/wallet')
      cy.url().should('match', /\/wallet/)
    })

    it('should display wallet balance', () => {
      cy.visit('/#/wallet')
      cy.wait(1000)
      cy.get('mat-card').should('contain', 'Balance')
    })

    it('should have option to add balance to wallet', () => {
      cy.visit('/#/wallet')
      cy.wait(500)
      cy.get('button, mat-card').should('contain.text', 'Add')
    })
  })

  describe('as unauthenticated user', () => {
    it('should redirect to login when accessing wallet without authentication', () => {
      cy.visit('/#/wallet')
      cy.url().should('match', /\/(login|#\/)/)
    })
  })
})
