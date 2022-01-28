import { screenSizes } from "../support/screenSizes";

describe("API Information Page is limited to signed in users", () => {
    it("Redirects to homepage if user is not signed in", () => {
        cy.testIfLimitedToSignedInUsers("/api-catalogue/testApi");
    });
});

describe("View API Information page", () => {
    beforeEach(function () {
        cy.login()

        // Stub API responses
        cy.intercept('GET', '/specs*', {fixture: "allApis"}).as("getAllApis");
        cy.fixture("testApiSwagger").then((swaggerData) => {
            this.swaggerData = swaggerData;
            cy.intercept({method: 'GET', url: /apis/gm}, swaggerData).as("getSwaggerInfo");
        });
        cy.fixture("testApi").then((apiData) => {
            this.apiData = apiData;
            cy.intercept({method: 'GET', url: /api\/v1/gm}, apiData).as("getApiInfo");
        });

        cy.visit("/api-catalogue");
        cy.get(".apiPreview").find("a").first().click();
        // navigate from API Catalogue
        cy.wait(["@getSwaggerInfo", "@getApiInfo"]);
    });

    it("Navigate directly to page", function() {
        cy.visit("/api-catalogue/api/testApi");
        const expectedUrl = this.swaggerData.basePath.split("/")[2];
        cy.url().should('include', expectedUrl);

    });

    screenSizes.forEach((screenSize) => {
        it(`View title and description on ${screenSize} screen`, function() {
            cy.viewport(screenSize);
            cy.contains(this.apiData.apiName).should('be.visible');
            cy.contains(this.apiData.description).should('be.visible');
        });

        it(`View environment status tags on ${screenSize} screen`, function () {
            cy.viewport(screenSize);
            const expectedEnvTagsNo = 4;
            cy.get(".sidePanel").find(".env-tags").first().children()
                .should('have.length', expectedEnvTagsNo)
                .each((tag) => {
                    const tagText = tag.text();
                    if (this.swaggerData.tags.filter( apiTag => apiTag.name === tagText).length > 0){
                        var tagColour;
                        switch(tagText){
                            case "Development":
                                tagColour = "yellow"; break;
                            case "Staging":
                                tagColour = "yellow"; break;
                            case "Production":
                                tagColour = "green"; break;
                            case "Deprecated":
                                tagColour = "red"; break;
                        }
                        expect(tag).to.have.class(`lbh-tag--${tagColour}`);
                    } else {
                        expect(tag).to.have.class(`lbh-tag--${tagText === "Deprecated"? "hidden" : "grey"}`);
                    }
                });
        });

        it(`View API Base URLs on ${screenSize} screen`, function() {
            cy.viewport(screenSize);
            cy.contains(this.apiData.developmentBaseURL).should('be.visible');
            cy.contains(this.apiData.stagingBaseURL).should('be.visible');
        });

        it(`View relevant links on ${screenSize} screen`, function() {
            cy.viewport(screenSize);
            var links = [
                {text: `${this.apiData.apiName} Specification`, url: this.apiData.apiSpecificationLink},
                {text: "GitHub Repository", url: this.apiData.githubLink},
            ]

            links.forEach(link => {
                cy.contains(link.text).click();
                cy.url().should("include", link.url);
                cy.go('back');
            });
        });
    })

    it("Should automatically have API version selected", function() {
        cy.get('select#VersionNo option:selected').should('have.text', this.swaggerData.info.version);
        cy.get("a").contains("SwaggerHub").click();
        const expectedUrl = this.swaggerData.basePath;
        cy.url().should('include', expectedUrl);
    });

    it("Can choose API version", function() {
        const selectedVersion = "2.0.0";
        cy.get('select').select(selectedVersion);
        cy.get('select#VersionNo option:selected').should('have.text', selectedVersion);
    });

});

describe.only("Error Handling", () => {
    beforeEach(function () {
        cy.login()
        cy.intercept('GET', '/specs*', {fixture: "allApis"}).as("getAllApis");
    });

    it("View error response if Swagger API error occurs", function(){
        cy.intercept({method: 'GET', url: /api\/v1/gm}, { fixture: "testApi.json"}).as("getApiInfo");
        cy.intercept({method: 'GET', url: /apis/gm}, { statusCode: 500 }).as("getSwaggerInfo");
        // arrange
        cy.visit("/api-catalogue");
        cy.get(".apiPreview").find("a").first().click();
        // act
        cy.get(".lbh-error-summary").should('be.visible');
        cy.get(".govuk-error-summary__body").should("contain", "Request failed with status code 500");
        cy.get(".env-tags").should("contain", "Sorry, we're having difficulty loading this data");

        cy.contains("SwaggerHub Specification")
            .next(".govuk-table__cell")
            .should("contain", "on SwaggerHub");
        // assert
    });

    it("View error response if API error occurs", function(){
        cy.intercept({method: 'GET', url: /apis/gm}, { fixture: "testApiSwagger.json"}).as("getSwaggerInfo");
        cy.intercept({method: 'GET', url: /api\/v1/gm}, { statusCode: 500}).as("getApiInfo");
        // arrange
        cy.visit("/api-catalogue");
        cy.get(".apiPreview").find("a").first().click();
        // act
        cy.get(".lbh-error-summary").should('be.visible');
        cy.get(".govuk-error-summary__body").should("contain", "Request failed with status code 500");
        const tableHeaders = ["Development Base URL", "Staging Base URL", "Relevant Links"];
        tableHeaders.forEach(header => {
            cy.contains(header)
                .next(".govuk-table__cell")
                .should("contain", "We're having difficulty loading this data");
        });
        cy.contains("SwaggerHub Specification")
            .next(".govuk-table__cell")
            .should("contain", "on SwaggerHub");
        // assert
    });

    it("View error response if both APIs have errors", function(){
        cy.intercept({method: 'GET', url: /api\/v1/gm}, { statusCode: 500}).as("getApiInfo");
        cy.intercept({method: 'GET', url: /apis/gm}, { statusCode: 500 }).as("getSwaggerInfo");
        // arrange
        cy.visit("/api-catalogue");
        cy.get(".apiPreview").find("a").first().click();
        // act
        cy.wait(["@getSwaggerInfo", "@getApiInfo"]);
        cy.get(".lbh-error-summary").should('be.visible');
        cy.get(".govuk-error-summary__body").should("contain", "Error: Request failed with status code 500 | Error: Request failed with status code 500");
        // assert
    });
});
