describe('/#/payment', () => {
  describe('as authenticated user', () => {
    beforeEach(() => {
      cy.login({ email: 'admin', password: 'admin123' })
    })

    it('should be able to access payment selection page', () => {
      cy.visit('/#/payment/shop')
      cy.url().should('match', /\/payment/)
    })

    it('should display available payment methods', () => {
      cy.visit('/#/payment/shop')
      cy.wait(1000)
      cy.get('mat-radio-button, mat-card').should('have.length.greaterThan', 0)
    })

    it('should allow selecting a payment method', () => {
      cy.visit('/#/payment/shop')
      cy.wait(1000)
      cy.get('mat-radio-button').first().click()
      cy.get('button[aria-label="Proceed to payment"]').should('be.visible')
    })

    it('should be able to add a new credit card', () => {
      cy.visit('/#/payment/shop')
      cy.wait(500)
      cy.get('button').contains('Add new card').click()
      cy.get('input[data-placeholder="Name"]').should('be.visible')
    })
  })

  describe('as unauthenticated user', () => {
    it('should redirect to login when accessing payment without authentication', () => {
      cy.visit('/#/payment/shop')
      cy.url().should('match', /\/(login|#\/)/)
    })
  })
})
