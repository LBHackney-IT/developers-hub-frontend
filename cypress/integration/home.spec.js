describe("Home page integration test", () => {
  before(() => {
    cy.visit("localhost:3000");
    cy.visit("https://developer-api.hackney.gov.uk/");
  })

  it("Checks for navigation sub-bar", () => {
    cy.get(".navigation-header > h3").should("have.text", "Navigation");
  });

  it("Checks for navigation sub-bar items", () => {
    cy.get(".sidebar > a").each(element => {
      expect(element).to.have.attr("href");
    });

    cy.get(".sidebar > a").should("have.length", 4);
  });

  it("Checks mission overview box", () => {
    cy.contains("Mission/Overview");
    cy.get(".mission-container > p").should("have.length", 3);
  });

  it("Checks info containers", () => {
    cy.contains("The need of a Developer Hub");
    cy.contains("API Specifications");
    cy.contains("Our Ways of Working");
    cy.contains("Why might you need an API?");
  });
});
