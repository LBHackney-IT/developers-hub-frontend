describe("Log in functionality", () => {
  it("Has a SIGN IN button in nav bar", () => {
    cy.visit("/");
    cy.contains('SIGN IN');
  });

  it("Redirects to homepage when signed in", () => {
    cy.login();
    cy.url().should("eq", "http://localhost:3000/");
  });

  it("Displays username when signed in", () => {
    cy.login();
    cy.contains('Hackney Test');
  });
});
