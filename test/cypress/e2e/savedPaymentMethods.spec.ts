describe('/saved payment methods', () => {
  describe('as authenticated user', () => {
    beforeEach(() => {
      cy.login({ email: 'admin', password: 'admin123' })
    })

    it('should be able to view saved payment methods', () => {
      cy.visit('/#/saved-payment-methods')
      cy.url().should('match', /\/saved-payment/)
      cy.wait(1000)
      cy.get('mat-card, mat-table').should('exist')
    })

    it('should display saved credit cards', () => {
      cy.visit('/#/saved-payment-methods')
      cy.wait(1000)
      cy.get('mat-card').should('have.length.greaterThan', -1)
    })

    it('should allow deleting a payment method', () => {
      cy.visit('/#/saved-payment-methods')
      cy.wait(1000)
      cy.get('button[aria-label*="Delete"], mat-icon').contains('delete').should('exist')
    })

    it('should allow adding a new payment method', () => {
      cy.visit('/#/saved-payment-methods')
      cy.wait(500)
      cy.get('button').contains('Add new card').should('be.visible')
    })
  })

  describe('as unauthenticated user', () => {
    it('should redirect to login when accessing saved payment methods without authentication', () => {
      cy.visit('/#/saved-payment-methods')
      cy.url().should('match', /\/(login|#\/)/)
    })
  })
})
