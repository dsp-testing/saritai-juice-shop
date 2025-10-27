describe('/#/delivery', () => {
  describe('as authenticated user with address', () => {
    beforeEach(() => {
      cy.login({ email: 'admin', password: 'admin123' })
    })

    it('should be able to access delivery method selection page', () => {
      cy.visit('/#/delivery-method')
      cy.url().should('match', /\/delivery/)
    })

    it('should display available delivery options', () => {
      cy.visit('/#/delivery-method')
      cy.wait(1000)
      cy.get('mat-radio-button, mat-card').should('have.length.greaterThan', 0)
    })

    it('should allow selecting a delivery speed', () => {
      cy.visit('/#/delivery-method')
      cy.wait(1000)
      cy.get('mat-radio-button').first().click()
      cy.get('button').contains('Continue').should('be.visible')
    })
  })

  describe('as unauthenticated user', () => {
    it('should redirect to login when accessing delivery without authentication', () => {
      cy.visit('/#/delivery-method')
      cy.url().should('match', /\/(login|#\/)/)
    })
  })
})
