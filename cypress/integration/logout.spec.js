describe("Sign out functionality", () => {
  beforeEach(function () {
      cy.login();
      // Stub API response
  });

    it("Redirects to home page on sign out", () => {
        cy.visit("/api-catalogue");
        cy.contains('SIGN OUT').click();
        cy.url().should("eq", "http://local.hackney.gov.uk:3000/");
    });
    it("Has a SIGN OUT button in the nav bar", () => {
      cy.visit("/");
      cy.contains("SIGN OUT");
    });
});
