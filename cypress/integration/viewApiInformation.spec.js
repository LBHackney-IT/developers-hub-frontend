import { spacedtoHyphenatedCase } from "../../src/utility/utility"

describe("View API Information page", () => {

    beforeEach(function () {
        // Stub API responses
        cy.intercept('GET', '/specs*', {fixture: "allApis"}).as("getAllApis");
        cy.fixture("testApi").then((apiData) => {
            this.apiData = apiData;
            cy.intercept({method: 'GET', url: /apis/gm}, apiData).as("getApiInfo");
        });

        cy.visit("/api-catalogue");
        cy.get(".apiPreview").find("a").first().click();
        // navigate from API Catalogue
    });

    it("Navigate to page", function() {
        const expectedUrl = spacedtoHyphenatedCase(this.apiData.info.title);
        cy.url().should('include', expectedUrl);

    });
    
    it("View title and description", function() {
        cy.contains(this.apiData.info.title).should('be.visible');
        cy.contains(this.apiData.info.description).should('be.visible');
    });
    
});