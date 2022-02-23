describe("Sign in functionality", () => {
  it("Has a SIGN IN button in nav bar", () => {
    cy.visit("/");
    cy.contains('SIGN IN').click();
    cy.url().should("eq", "http://localhost:3000/login");
  });

  it("Displays username when signed in", () => {
    cy.login();
    cy.contains('Hackney Test');
  });

  it("Redirects back to page after signing in", () => {
    cy.visit("/api-catalogue");
    cy.get('.lbh-button').contains("Sign in with Google")
      .should("have.attr", "href")
      .and("include", "redirect_uri=http://localhost:3000/api-catalogue");
  })

  it("Redirects to homepage by default after signing in", () => {
    cy.login();
    cy.url().should("eq", "http://localhost:3000/");
  });

});

describe("Sign out functionality", () => {
  beforeEach(function () {
      cy.login();
  });

  it("Has a SIGN OUT button in the nav bar", () => {
    cy.contains("SIGN OUT");
  });

  it("SIGN OUT button signs out user when clicked on", () => {
    cy.visit("/api-catalogue");
    cy.contains("SIGN OUT").click();
    cy.contains("You cannot access this page");
  })
});
