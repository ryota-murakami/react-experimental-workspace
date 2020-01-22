context('Pages/Modal', () => {
  it('could Open/Close Modal', () => {
    cy.visit('http://localhost:3000/')
    cy.contains('・Modal').click()

    cy.url().should('equal', 'http://localhost:3000/modal')
    cy.get('[data-cy=modal]').should('not.visible')
    cy.get('[data-cy=overlay]').should('not.visible')
    cy.get('[data-cy=open-modal-button]').click()
    cy.get('[data-cy=modal]').should('visible')
    cy.get('[data-cy=modal-close-button]').click()
    cy.get('[data-cy=modal]').should('not.visible')
    cy.get('[data-cy=overlay]').should('not.visible')

    cy.get('[data-cy=open-modal-button]').click()
    cy.get('[data-cy=overlay]').click(100, 100)
    cy.get('[data-cy=modal]').should('not.visible')
    cy.get('[data-cy=overlay]').should('not.visible')
  })
})
