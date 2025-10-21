describe('/language selection', () => {
  beforeEach(() => {
    cy.visit('/#/')
  })

  it('should have a language selection option', () => {
    cy.get('button[aria-label*="Language"], mat-select[placeholder*="Language"]').should('exist')
  })

  it('should display available languages', () => {
    cy.get('button[aria-label*="Language"]').click()
    cy.get('mat-option').should('have.length.greaterThan', 1)
  })

  it('should change language when selected', () => {
    cy.get('button[aria-label*="Language"]').click()
    cy.get('mat-option').contains('Deutsch').click()
    cy.wait(500)
    cy.get('body').should('contain', 'Alle Produkte')
  })

  it('should persist language selection after reload', () => {
    cy.get('button[aria-label*="Language"]').click()
    cy.get('mat-option').contains('Español').click()
    cy.wait(500)
    cy.reload()
    cy.wait(500)
    cy.get('body').should('contain', 'Todos los productos')
  })

  it('should change back to English', () => {
    cy.get('button[aria-label*="Language"]').click()
    cy.get('mat-option').contains('English').click()
    cy.wait(500)
    cy.get('body').should('contain', 'All Products')
  })
})
