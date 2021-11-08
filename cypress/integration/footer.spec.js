import { screenSizes } from "../support/screenSizes";

const footerItemText = [
    "Hackney sites",
    "Accessibility",
    "Contact us",
];

describe("Developer Hub Footer", () => {
  screenSizes.forEach((screenSize) => {

      it(`Renders Footer Links on ${screenSize}`, () => {
        cy.viewport(screenSize);
        cy.visit("/")

        cy.get("#app-footer")
        .children()
        .each(($link, i) => {
          expect($link.text()).to.equal(footerItemText[i]);
        });
      });
      
    });
  });
