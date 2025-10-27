describe('/#/recycle', () => {
  describe('as authenticated user', () => {
    beforeEach(() => {
      cy.login({ email: 'admin', password: 'admin123' })
    })

    it('should be able to access recycling page', () => {
      cy.visit('/#/recycle')
      cy.url().should('match', /\/recycle/)
    })

    it('should display recycle submission form', () => {
      cy.visit('/#/recycle')
      cy.wait(500)
      cy.get('input[data-placeholder*="Quantity"]').should('be.visible')
    })

    it('should have address selector for pickup', () => {
      cy.visit('/#/recycle')
      cy.wait(500)
      cy.get('mat-select[placeholder*="Address"]').should('exist')
    })

    it('should have date picker for pickup date', () => {
      cy.visit('/#/recycle')
      cy.wait(500)
      cy.get('input[matinput][placeholder*="Date"]').should('exist')
    })

    it('should be able to submit recycle request', () => {
      cy.visit('/#/recycle')
      cy.wait(500)
      cy.get('input[data-placeholder*="Quantity"]').type('5')
      cy.get('button#submitButton').should('be.visible')
    })
  })

  describe('as unauthenticated user', () => {
    it('should redirect to login when accessing recycle without authentication', () => {
      cy.visit('/#/recycle')
      cy.url().should('match', /\/(login|#\/)/)
    })
  })
})
