import { screenSizes } from "../support/screenSizes";
import { filterSwaggerPropertiesByType } from "../../src/utility/utility"

describe("Preview an API", () => {

    beforeEach(function () {
        cy.login();
        // Stub API response
        cy.fixture("allApis").then((allApis) => {
            this.apiData = allApis.apis[0];
            cy.intercept('GET', '/specs*', allApis).as("getAllApis");
            cy.visit("/api-catalogue");
            cy.wait("@getAllApis");
        });
    });

    it.only("Redirects user to API Information Page when clicking on API name", function () {
        cy.get(".title").contains(this.apiData.name).click();
        cy.url().should('include', `/api-catalogue/api/testApi`);
    });

    screenSizes.forEach((screenSize) => {
        it(`View API name on ${screenSize} screen`, function () {
            cy.viewport(screenSize);
            cy.get(".title").find("h2").first()
                .should("have.text", this.apiData.name);
        });

        it(`View API version on ${screenSize} screen`, function () {
            cy.viewport(screenSize);
            const expectedVersion = filterSwaggerPropertiesByType(this.apiData.properties, "X-Version");
            cy.get(".title").find("p").first()
                .should("contain", expectedVersion.value);
        });

        it(`View last edited date of API on ${screenSize} screen`, function () {
            cy.viewport(screenSize);
            const lastModifiedDate = filterSwaggerPropertiesByType(this.apiData.properties, "X-Modified").value.split("T")[0];
            cy.get(".title").find("p").first()
                .should("contain", lastModifiedDate);
        });

        it(`View API description on ${screenSize} screen`, function () {
            cy.viewport(screenSize);
            cy.get(".apiPreview").find(".description").first()
                .should("have.text", this.apiData.description);
        });

        it(`View active status tag on ${screenSize} screen`, function () {
            cy.viewport(screenSize);
            const isPublished = filterSwaggerPropertiesByType(this.apiData.properties, "X-Published").value.toLowerCase() == "true";
            const expectedClass = isPublished ? "lbh-tag" : "lbh-tag--grey";
            cy.get(".apiPreview").find(".top > span.govuk-tag").first().should(($tag) => {
                const tagText = $tag.text();
                const expectedTagText = isPublished ? "Active" : "Inactive";
                expect(tagText).to.equal(expectedTagText);
            }).should('have.class', expectedClass);
        });

        it(`View environment status tags on ${screenSize} screen`, function () {
            cy.viewport(screenSize);
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
