import { screenSizes } from "../support/screenSizes";

const homepages = [
  {
    sidebarText: "Mission",
    heading: "Mission/Overview",
    id: "mission"
  },
  {
    sidebarText: "The need of a Developer Hub",
    heading: "The need of a Developer Hub",
    id: "need-of-dev-hub"
  },
  {
    sidebarText: "API Specifications",
    heading: "API Specifications",
    id: "api-specifications"
  },
  {
    sidebarText: "Our Ways of Working",
    heading: "Our Ways of Working",
    id: "ways-of-working"
  }
]

describe("Sidebar", () => {
  beforeEach(() => {
    cy.visit("/")
  });

  screenSizes.forEach((screenSize) => {

    it(`Displays correct links on ${screenSize}`, () => {
      cy.viewport(screenSize);
      const sidebar = cy.get(".sidebar");
      sidebar.contains("CONTENTS");
  
      const sidebarLinks = sidebar.get(".sidebarLink");
      sidebarLinks.should("have.length", 4);

      sidebarLinks.each(($link, i) => {
        expect($link.text()).to.equal(homepages[i].sidebarText);
      });
    });

  });
  
});

describe("Homepages", () => {

  homepages.forEach((homepage) => {

    it(`Can navigate to ${homepage.heading} by URL`, () => {
      cy.visit(`/#${homepage.id}`);
      cy.get("h2").contains(homepage.heading).should('be.visible');
    });

  });

})
