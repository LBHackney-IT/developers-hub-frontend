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
