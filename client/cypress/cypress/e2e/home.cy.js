describe('Home Page', () => {
  it('displays welcome text', () => {
    cy.visit('http://localhost:5173');
    cy.contains('Hello from React + Vite!');
  });
});
