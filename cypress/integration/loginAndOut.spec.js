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

describe("Sign out functionality", () => {
  beforeEach(function () {
      cy.login();
  });
    it("Has a SIGN OUT button in the nav bar", () => {
      cy.contains("SIGN OUT");
    });
    it("Redirects to sign in page on sign out", () => {
        cy.visit("/api-catalogue");
        cy.contains('SIGN OUT').click();
        cy.url().should("include", "/login");
    });
});
