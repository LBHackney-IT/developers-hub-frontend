import { screenSizes } from "../support/screenSizes";

const homepages = [
  {
    sidebarText: "Mission",
    heading: "Mission/Overview",
    id: "mission"
  },
  {
    sidebarText: "The Need of a Developer Hub",
    heading: "The Need of a Developer Hub",
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
  },
  {
      sidebarText: "API Authentication",
      heading: "API Authentication",
      id: "api-authentication"
  },
  {
  sidebarText: "How The Authentication Works",
  heading: "How The Authentication Works",
  id: "how-the-authentication-works"
  },
  {
  sidebarText: "How to setup your API Authenticator",
  heading: "How to setup your API Authenticator",
  id: "setting-up-api-authenticator"
  },
  {
    sidebarText: "How to amend access to your API",
    heading: "How to amend access to your API",
    id: "how-to-amend-acess-to-an-api"
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
      sidebarLinks.should("have.length", 8);
      
   
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
