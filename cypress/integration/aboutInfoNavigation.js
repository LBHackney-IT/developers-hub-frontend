import { screenSizes } from "../support/screenSizes";

describe("Navigation button shows", () => {

  beforeEach(function () {
    cy.visit("/");
  });

  screenSizes.forEach((screenSize) => {
    it("First page does not have a Previous Button", () => {
      cy.get(".about-button").should('not.have.value', 'Previous')
    })

    it("Last page does not have a Next Button", () => {
      cy.visit("/#how-to-amend-acess-to-an-api");
      cy.get(".about-button").should('not.have.value', 'Next')
    })

    it("Has a Next Button", () => {
      const nextButton = cy.get(".about-button");
      nextButton.contains('Next');
    })

    it("Has a Previous Button", () => {
      cy.get(".about-button").click();
      const previousButton = cy.get(".about-button").eq(0)
      previousButton.contains('Previous');
    })
  })

  it("Redirects to next page", () => {
    const nextButton = cy.get(".about-button").click();
    cy.url().should("eq", "http://localhost:3000/#need-of-dev-hub")
  })

  it("Redirects to previous page", () => {
    cy.get(".about-button").click();
    const previousButton = cy.get(".about-button").eq(0).click();
    cy.url().should("eq", "http://localhost:3000/#mission")
  })
});
