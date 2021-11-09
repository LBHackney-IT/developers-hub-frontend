import { screenSizes } from "../support/screenSizes";

const headerItemText = [
  "API CATALOGUE",
  "SIGN IN",
];

describe("Developer Hub Header", () => {
  screenSizes.forEach((screenSize) => {
    it(`Renders logo on ${screenSize}`, () => {
      cy.viewport(screenSize);
      cy.visit("/");
      cy.get(".lbh-header__logo-fallback-image");
    });

    it(`Renders website name on ${screenSize}`, () => {
      cy.viewport(screenSize);
      cy.visit("/");
      const headerTitle = cy.get(".lbh-header__service-name");
      headerTitle.contains("Developer Hub");
    });

    it(`Renders navigation links on ${screenSize}`, () => {
      cy.viewport(screenSize);
      cy.visit("/");
      const header = cy.get("#header");
      header.get(".lbh-header__links").children(".nav-item")
      .each(($link, i) => {
        expect($link.text()).to.equal(headerItemText[i]);
      });
    });
  })
});