import { spacedtoHyphenatedCase } from "../../src/utility/utility"

describe("API Information Page is limited to signed in users", () => {
    it("Redirects to homepage if user is not signed in", function (){
        cy.visit("/api-catalogue/testApi");
        cy.url().should("eq", "http://localhost:3000/");
    });
});

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

    it("View environment status tags", function () {
        const expectedEnvTagsNo = 3;
        cy.get(".sidebar").find(".env-tags").first().children()
            .should('have.length', expectedEnvTagsNo)
            .each((tag) => {
                if (this.apiData.tags.filter( apiTag => apiTag.name === tag.text()).length > 0){
                    expect(tag).to.have.class("lbh-tag--green");
                } else {
                    expect(tag).to.have.class("lbh-tag--grey");
                }
            });
    });

    it("Should automatically have API version selected", function() {
        cy.get('select#VersionNo option:selected').should('have.text', this.apiData.info.version);
        cy.contains("SwaggerHub").click();
        const expectedUrl = this.apiData.basePath;
        cy.url().should('include', expectedUrl);
    });

    it("Can choose API version", function() {
        const selectedVersion = "2.0.0";
        cy.get('select').select(selectedVersion);
        cy.get('select#VersionNo option:selected').should('have.text', selectedVersion);
    });
    
});

describe("Test error response", () => {
    it("View error response if API error occurs", () => {
        cy.intercept('GET', '/specs*', {fixture: "allApis"}).as("getAllApis");
        cy.intercept({method: 'GET', url: /apis/gm}, { statusCode: 500 })

        cy.visit("/api-catalogue");
        cy.get(".apiPreview").find("a").first().click();

        cy.get(".lbh-error-summary").should('be.visible');
    });
});