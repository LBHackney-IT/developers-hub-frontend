import { screenSizes } from "../support/screenSizes";

describe("Preview an API", () => {

    beforeEach(function () {
        // Stub API response
        cy.fixture("allApis").then((allApis) => {
            this.apiData = allApis.apis[0];
            cy.intercept('GET', '/specs*', allApis).as("getAllApis");
            cy.visit("/api-catalogue");
        });
    });

    screenSizes.forEach((screenSize) => {
        it(`View API name on ${screenSize} screen`, function () {
            cy.get(".title").find("h3").first()
                .should("have.text", this.apiData.name);
        });

        it(`View API version on ${screenSize} screen`, function () {
            const expectedVersion = this.apiData.properties.filter(property => property.type === "X-Version")[0]
            cy.get(".title").find("p").first()
                .should("have.text", `Version ${expectedVersion.value}`);
        });

        it(`View API description on ${screenSize} screen`, function () {
            cy.get(".apiPreview").find(".description").first()
                .should("have.text", this.apiData.description);
        });

        it(`View active status tag on ${screenSize} screen`, function () {
            const isPublished = this.apiData.properties.filter( property => property.type === "X-Published")[0].value.toLowerCase() == "true";
            const expectedClass = isPublished ? "lbh-tag" : "lbh-tag--grey";
            cy.get(".apiPreview").find(".top > span.govuk-tag").first().should(($tag) => {
                const tagText = $tag.text();
                const expectedTagText = isPublished ? "Active" : "Inactive";
                expect(tagText).to.equal(expectedTagText);
            }).should('have.class', expectedClass);
        });

        it(`View environment status tags on ${screenSize} screen`, function () {
            const expectedEnvTagsNo = 3;
            cy.get(".apiPreview").find(".env-tags").first().children()
                .should('have.length', expectedEnvTagsNo)
                .each((tag) => {
                    if (this.apiData.tags.includes(tag.text())){
                        expect(tag).to.have.class("lbh-tag--green");
                    } else {
                        expect(tag).to.have.class("lbh-tag--grey");
                    }
                });
        });
    });
});