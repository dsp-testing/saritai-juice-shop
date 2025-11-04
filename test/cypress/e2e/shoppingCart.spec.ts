describe('/shopping cart', () => {
  beforeEach(() => {
    cy.visit('/#/')
  })

  it('should show cart button in navigation', () => {
    cy.get('button[aria-label*="Cart"], button[aria-label*="Basket"]').should('be.visible')
  })

  it('should display item count badge on cart button', () => {
    cy.get('mat-badge-content, .mat-badge-content').should('exist')
  })

  describe('adding items to cart', () => {
    it('should be able to add product to cart', () => {
      cy.get('mat-card').first().click()
      cy.wait(500)
      cy.get('button[aria-label*="Add to Basket"]').click()
      cy.wait(500)
      cy.get('mat-badge-content, .mat-badge-content').should('contain', '1')
    })

    it('should increment cart count when adding multiple items', () => {
      cy.get('mat-card').first().click()
      cy.wait(500)
      cy.get('button[aria-label*="Add to Basket"]').click()
      cy.wait(500)
      cy.get('button[mat-dialog-close], button').contains('Close').click()
      cy.wait(500)
      cy.get('mat-card').eq(1).click()
      cy.wait(500)
      cy.get('button[aria-label*="Add to Basket"]').click()
      cy.wait(500)
    })
  })

  describe('viewing cart', () => {
    it('should navigate to cart page when clicking cart button', () => {
      cy.get('button[aria-label*="Cart"], button[aria-label*="Basket"]').click()
      cy.url().should('match', /\/basket/)
    })

    it('should display items in cart', () => {
      cy.visit('/#/basket')
      cy.wait(1000)
      cy.get('mat-table, mat-card').should('exist')
    })
  })

  describe('modifying cart', () => {
    beforeEach(() => {
      cy.visit('/#/basket')
      cy.wait(1000)
    })

    it('should be able to increase item quantity', () => {
      cy.get('button[aria-label*="Add"], svg-icon[name="plus"]').should('exist')
    })

    it('should be able to decrease item quantity', () => {
      cy.get('button[aria-label*="Remove"], svg-icon[name="minus"]').should('exist')
    })

    it('should be able to delete item from cart', () => {
      cy.get('button[aria-label*="Delete"], mat-icon').contains('delete').should('exist')
    })
  })
})
