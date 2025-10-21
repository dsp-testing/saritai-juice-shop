describe('/#/photo-wall', () => {
  beforeEach(() => {
    cy.visit('/#/photo-wall')
  })

  it('should be able to access photo wall page', () => {
    cy.url().should('match', /\/photo-wall/)
  })

  it('should display customer photo memories', () => {
    cy.wait(1000)
    cy.get('mat-card, img').should('have.length.greaterThan', 0)
  })

  it('should show images in the photo wall', () => {
    cy.wait(1000)
    cy.get('img').should('be.visible')
  })

  describe('as authenticated user', () => {
    beforeEach(() => {
      cy.login({ email: 'admin', password: 'admin123' })
    })

    it('should allow uploading photos', () => {
      cy.visit('/#/photo-wall')
      cy.wait(500)
      cy.get('button').contains('Add Photo').should('be.visible')
    })
  })
})
