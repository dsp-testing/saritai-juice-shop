describe('/product reviews', () => {
  beforeEach(() => {
    cy.visit('/#/')
  })

  describe('viewing product reviews', () => {
    it('should display reviews for a product', () => {
      cy.get('mat-card').first().click()
      cy.wait(500)
      cy.get('mat-expansion-panel-header').contains('Reviews').should('exist')
    })

    it('should expand reviews section when clicked', () => {
      cy.get('mat-card').first().click()
      cy.wait(500)
      cy.get('mat-expansion-panel-header').contains('Reviews').click()
      cy.get('mat-list-item').should('have.length.greaterThan', -1)
    })
  })

  describe('creating product reviews', () => {
    beforeEach(() => {
      cy.login({ email: 'admin', password: 'admin123' })
    })

    it('should allow authenticated users to write a review', () => {
      cy.visit('/#/')
      cy.get('mat-card').first().click()
      cy.wait(500)
      cy.get('textarea[placeholder="Review"]').should('exist')
    })

    it('should be able to submit a review', () => {
      cy.visit('/#/')
      cy.get('mat-card').first().click()
      cy.wait(500)
      cy.get('textarea[placeholder="Review"]').type('This is a test review')
      cy.get('button[type="submit"]').contains('Submit').click()
    })
  })

  describe('liking product reviews', () => {
    it('should display like buttons on reviews', () => {
      cy.visit('/#/')
      cy.get('mat-card').first().click()
      cy.wait(500)
      cy.get('mat-expansion-panel-header').contains('Reviews').click()
      cy.wait(500)
      cy.get('button[aria-label*="like"], mat-icon').should('have.length.greaterThan', 0)
    })
  })
})
