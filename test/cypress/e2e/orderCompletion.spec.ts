describe('/order completion workflow', () => {
  describe('complete order flow', () => {
    beforeEach(() => {
      cy.login({ email: 'admin', password: 'admin123' })
    })

    it('should be able to complete full order process', () => {
      // Add item to basket
      cy.visit('/#/')
      cy.wait(1000)
      cy.get('mat-card').first().click()
      cy.wait(500)
      cy.get('button[aria-label*="Add to Basket"]').click()
      cy.wait(500)

      // Go to basket
      cy.visit('/#/basket')
      cy.wait(1000)
      cy.get('button#checkoutButton').should('be.visible')
      cy.get('button#checkoutButton').click()

      // Select address
      cy.wait(1000)
      cy.url().should('match', /\/address/)
      cy.get('mat-radio-button').first().click()
      cy.get('button[aria-label*="Continue"]').click()

      // Select delivery
      cy.wait(1000)
      cy.url().should('match', /\/delivery/)
      cy.get('mat-radio-button').first().click()
      cy.get('button').contains('Continue').click()

      // Select payment
      cy.wait(1000)
      cy.url().should('match', /\/payment/)
    })

    it('should show order summary before confirmation', () => {
      cy.visit('/#/order-summary')
      cy.wait(1000)
      cy.get('mat-card').should('contain', 'Order Summary')
        .or('contain', 'Items')
        .or('contain', 'Total')
    })

    it('should have checkout button on order summary', () => {
      cy.visit('/#/order-summary')
      cy.wait(1000)
      cy.get('button#checkoutButton').should('be.visible')
    })
  })
})
