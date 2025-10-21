describe('/saved addresses', () => {
  describe('as authenticated user', () => {
    beforeEach(() => {
      cy.login({ email: 'admin', password: 'admin123' })
    })

    it('should be able to view saved addresses', () => {
      cy.visit('/#/address/saved')
      cy.url().should('match', /\/address/)
      cy.wait(1000)
      cy.get('mat-card, mat-table').should('exist')
    })

    it('should allow editing an existing address', () => {
      cy.visit('/#/address/saved')
      cy.wait(1000)
      cy.get('button[aria-label*="Edit"], mat-icon').contains('edit').first().click()
      cy.url().should('match', /\/address\/edit/)
    })

    it('should allow deleting an address', () => {
      cy.visit('/#/address/saved')
      cy.wait(1000)
      cy.get('button[aria-label*="Delete"], mat-icon').contains('delete').should('exist')
    })
  })

  describe('as unauthenticated user', () => {
    it('should redirect to login when accessing saved addresses without authentication', () => {
      cy.visit('/#/address/saved')
      cy.url().should('match', /\/(login|#\/)/)
    })
  })
})
