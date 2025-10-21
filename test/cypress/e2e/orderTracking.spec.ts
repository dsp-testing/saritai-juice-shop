describe('/order tracking', () => {
  beforeEach(() => {
    cy.visit('/#/track-result')
  })

  it('should be able to access order tracking page', () => {
    cy.url().should('match', /\/track/)
  })

  it('should have input field for order ID', () => {
    cy.visit('/#/track-order')
    cy.wait(500)
    cy.get('input[placeholder*="Order"], input#orderId').should('be.visible')
  })

  it('should be able to enter order ID', () => {
    cy.visit('/#/track-order')
    cy.wait(500)
    cy.get('input[placeholder*="Order"], input#orderId').type('12345-abcde')
  })

  it('should have track button', () => {
    cy.visit('/#/track-order')
    cy.wait(500)
    cy.get('button').contains('Track').should('be.visible')
  })

  it('should show results page after tracking', () => {
    cy.visit('/#/track-result')
    cy.wait(500)
    cy.get('mat-card').should('exist')
  })
})
