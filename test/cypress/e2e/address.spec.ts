describe('/#/address', () => {
  describe('as authenticated user', () => {
    beforeEach(() => {
      cy.login({ email: 'admin', password: 'admin123' })
    })

    it('should be able to access address selection page', () => {
      cy.visit('/#/address/select')
      cy.url().should('match', /\/address/)
    })

    it('should have option to add new address', () => {
      cy.visit('/#/address/select')
      cy.wait(1000)
      cy.get('button').contains('Add New Address').should('be.visible')
    })

    it('should open add address form', () => {
      cy.visit('/#/address/select')
      cy.wait(1000)
      cy.get('button').contains('Add New Address').click()
      cy.url().should('match', /\/address\/create/)
      cy.get('input[data-placeholder*="Country"]').should('be.visible')
    })

    it('should be able to fill address form', () => {
      cy.visit('/#/address/create')
      cy.wait(500)
      cy.get('input[data-placeholder*="Country"]').type('United States')
      cy.get('input[data-placeholder*="Name"]').type('John Doe')
      cy.get('input[data-placeholder*="Mobile"]').type('1234567890')
      cy.get('input[data-placeholder*="ZIP"]').type('12345')
      cy.get('textarea[data-placeholder*="Address"]').type('123 Main Street')
      cy.get('input[data-placeholder*="City"]').type('New York')
    })

    it('should be able to submit address', () => {
      cy.visit('/#/address/create')
      cy.wait(500)
      cy.get('input[data-placeholder*="Country"]').type('USA')
      cy.get('input[data-placeholder*="Name"]').type('Test User')
      cy.get('input[data-placeholder*="Mobile"]').type('9876543210')
      cy.get('input[data-placeholder*="ZIP"]').type('54321')
      cy.get('textarea[data-placeholder*="Address"]').type('456 Test Ave')
      cy.get('input[data-placeholder*="City"]').type('Test City')
      cy.get('button#submitButton').click()
    })
  })

  describe('as unauthenticated user', () => {
    it('should redirect to login when accessing address without authentication', () => {
      cy.visit('/#/address/select')
      cy.url().should('match', /\/(login|#\/)/)
    })
  })
})
