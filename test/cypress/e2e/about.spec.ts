describe('/#/about', () => {
  beforeEach(() => {
    cy.visit('/#/about')
  })

  it('should be able to access about page', () => {
    cy.url().should('match', /\/about/)
  })

  it('should display company information', () => {
    cy.wait(500)
    cy.get('mat-card').should('exist')
  })

  it('should show social media links', () => {
    cy.wait(500)
    cy.get('a[href*="twitter"], a[href*="facebook"], a[href*="slack"], a[href*="reddit"]')
      .should('have.length.greaterThan', 0)
  })

  it('should display customer feedback section', () => {
    cy.wait(500)
    cy.get('mat-card').should('contain.text', 'Customer Feedback')
      .or('contain.text', 'customer')
      .or('contain.text', 'feedback')
  })
})
