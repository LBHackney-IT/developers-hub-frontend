describe("Sign out functionality", () => {

    it("Redirects to home page on sign out", () => {
        //cy.login()
        cy.visit("/api-catalogue");
        // cy.contains('SIGN OUT').click();
        cy.url().should("eq", "http://local.hackney.gov.uk:3000/");
    });
    it("Has the SIGN IN button in the nav bar", () => {
      cy.visit("/")
      cy.contains('SIGN IN')
    });
});
