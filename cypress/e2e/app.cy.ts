describe('Navigation to new user page', () => {
  it('should navigate to the new user page', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/');

    // Check title
    cy.get('h1').contains('Browse users');

    // Check for link to "new user"
    cy.contains('a', 'Add new user')
      .should('be.visible')
      .and('have.attr', 'href');

    // Nav to new user page
    cy.get('a[href*="new"]').click();

    cy.url().should('include', '/new');

    // Check for new user page
    cy.get('h1').contains('New User');
  });
});
