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
    sidebarText: "How the API Authentication process works",
    heading: "How the API Authentication process works",
    id: "how-the-authentication-works"
  },
  {
    sidebarText: "How to set up your API Authenticator",
    heading: "How to set up your API Authenticator",
    id: "setting-up-api-authenticator"
  },
  {
    sidebarText: "How to amend access to your API",
    heading: "How to amend access to your API",
    id: "how-to-amend-acess-to-an-api"
  } 

]

describe("Homepages", () => {
  homepages.forEach((homepage, index) => {

    it(`Can navigate to ${homepage.heading} by URL`, () => {
      cy.visit(`/#${homepage.id}`);
      cy.get("h2").contains(homepage.heading).should('be.visible');
    });

    it("Has a next button & redirects to next page", () => {
      cy.visit(`/#${homepage.id}`);
      if(index < homepages.length - 1){
        const nextButton = cy.get(".about-button").contains("Next");
        nextButton.click();
        cy.url().should("eq", `http://localhost:3000/#${homepages[index + 1].id}`)
      }
    });
  
    it("Has a previous button & redirects to previous page", () => {
      cy.visit(`/#${homepage.id}`);
      if(index > 0){
        const previousButton = cy.get(".about-button").contains("Previous");
        previousButton.click();
        cy.url().should("eq", `http://localhost:3000/#${homepages[index - 1].id}`)
      }
    });

  });
});

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

describe("Homepage navigation buttons", () => {

  beforeEach(function () {
    cy.visit("/");
  });

  it("First page does not have a Previous Button", () => {
    cy.get(".about-button").should('not.have.value', 'Previous')
  })

  it("Last page does not have a Next Button", () => {
    cy.visit("/#how-to-amend-acess-to-an-api");
    cy.get(".about-button").should('not.have.value', 'Next')
  })

});

describe('Api Authentication Pages', () => {
  it('Renders the API Authentication page ', () => {
      // assert
      cy.visit('/#api-authentication')
      cy.get('h2').contains('API Authentication').should('be.visible');
       // act    
  });

  it('Renders the "How the Authentication Works" page', () => {
      cy.visit('/#how-the-authentication-works');
      cy.get('h2').contains('How the API Authentication process works').should('be.visible');
  });

  it('Renders the "Setting up Authenticator" page', () => {
      cy.visit('/#setting-up-api-authenticator');
      cy.get('h2').contains('How to set up your API Authenticator').should('be.visible');
  });

  it('Renders the "Amend access to an API" page', () => {
      cy.visit('/#how-to-amend-acess-to-an-api')
      cy.get('h2').contains('How to amend access to your API').should('be.visible');
  });
});

