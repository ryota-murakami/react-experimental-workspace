context('Smoke Test', () => {
  it('should show top page', () => {
    cy.visit('http://localhost:3000/')
    cy.get('h1').should('contain', 'React Garden')
  })
})
