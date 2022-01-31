import { screenSizes } from "../support/screenSizes";

describe("Navigation button shows", () => {

  beforeEach(function () {
    cy.visit("/");
  });

  screenSizes.forEach((screenSize) => {
    it("Has a Next Button", () => {
      const nextButton = cy.get(".about-button").eq(1)
      nextButton.contains('Next');
    })

    it("Has a Previous Button", () => {
      const previousButton = cy.get(".about-button").eq(0)
      previousButton.contains('Previous');
    })
  })

  it("Redirects to next page", () => {
    const nextButton = cy.get(".about-button").eq(1).click();
    cy.url().should("eq", "http://localhost:3000/#need-of-dev-hub")
  })

  it("Redirects to previous page", () => {
    const previousButton = cy.get(".about-button").eq(0).click();
    cy.url().should("eq", "http://localhost:3000/#how-to-amend-acess-to-an-api")
  })
});
