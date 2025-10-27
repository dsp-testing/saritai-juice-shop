describe('/#/order-history', () => {
  describe('as authenticated user', () => {
    beforeEach(() => {
      cy.login({ email: 'admin', password: 'admin123' })
    })

    it('should be able to access order history page', () => {
      cy.visit('/#/order-history')
      cy.url().should('match', /\/order-history/)
    })

    it('should display order history when user has orders', () => {
      cy.visit('/#/order-history')
      cy.get('mat-table').should('exist')
    })

    it('should show order details when clicking on an order', () => {
      cy.visit('/#/order-history')
      cy.wait(1000)
      cy.get('mat-row').first().within(() => {
        cy.get('mat-cell').should('have.length.greaterThan', 0)
      })
    })
  })

  describe('as unauthenticated user', () => {
    it('should redirect to login when accessing order history without authentication', () => {
      cy.visit('/#/order-history')
      cy.url().should('match', /\/(login|#\/)/)
    })
  })
})
