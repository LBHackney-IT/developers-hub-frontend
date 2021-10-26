import { screenSizes } from "../support/screenSizes";

describe("Search for APIs", function() {
    beforeEach(function () {
        cy.login();
        cy.intercept('/specs*').as('getApiDefinitions');
        cy.visit("/api-catalogue/search");
    });

    screenSizes.forEach((screenSize) => {

        it("Is accessible through the search icon", function() {
            cy.visit("/api-catalogue");
            cy.get(".searchIcon").click();
            cy.url().should("contain", "/api-catalogue/search");
        });

        it("Shows the search bar and title", function() {
            cy.get("h1").contains("Search").should("be.visible");
            cy.get("input#query").should("be.visible");
        });

        it("Sets the search label and placeholder to 'Search for an API' then 'Search again'", function() {
            cy.get("#query").should('have.attr', 'placeholder', 'Search for an API...');
            cy.get("#query").type("test");
            cy.get(".lbh-search-box__action").click();
            cy.get("#query").should('have.attr', 'placeholder', 'Search again...');
        });
    
        it("Shows an error message when no results are returned", function() {
            const query = "query for api that doesn't exist";
            cy.visit(`/api-catalogue/search?query=${query}`);
            cy.intercept('@getApiDefinitions', {totalCount: 0});
            cy.get(".lbh-error-summary").should('be.visible');
        });
    
    })

    it("Adds the form input as a query parameter", function() {
        const query = "test"
        cy.get("#query").type(query);
        cy.get(".lbh-search-box__action").click();
        cy.url().should('include', `query=${query}`);
    });

    it("Queries the SwaggerHub API with the form response", function() {
        const query = "Tenure"
        cy.get("#query").type(query);
        cy.get(".lbh-search-box__action").click();
        cy.wait('@getApiDefinitions').its('request.url').should('include', `query=${query}`);
    });

    it("Queries the SwaggerHub API with the query from the url", function() {
        const query = "queryString";
        cy.visit(`/api-catalogue/search?query=${query}`)
        cy.wait('@getApiDefinitions').its('request.url').should('include', `query=${query}`);
    });

    it("Shows the search query in the heading & breadcrumbs", function() {
        const query = "someQuery";
        cy.visit(`/api-catalogue/search?query=${query}`);
        cy.get(".govuk-breadcrumbs__list-item").should("contain", query);
        cy.get("h1").should("contain", query);
    });

    it("Shows a special character search query in the heading & breadcrumbs", function() {
        const query = "s@me' qu£ry";
        cy.get("#query").type(query);
        cy.get(".lbh-search-box__action").click();
        cy.get(".govuk-breadcrumbs__list-item").should("contain", query);
        cy.get("h1").should("contain", query);
    });

});