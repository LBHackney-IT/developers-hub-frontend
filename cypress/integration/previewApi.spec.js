describe("Preview an API", () => {

    beforeEach(function () {
        // Stub API response
        cy.fixture("allApis").then((allApis) => {
            this.apiData = allApis.apis[0];
            cy.intercept('GET', '/apis/Hackney*', allApis).as("getAllApis");
            cy.visit("/api-catalogue");
        });

    });

    it("View API name", function () {
        cy.get(".apiPreview").find("h3").first()
            .should("have.text", this.apiData.name);
    });

    it("View API description", function () {
        cy.get(".apiPreview").find("p").first()
            .should("have.text", this.apiData.description);
    });

    it("View active status tag", function () {
        const expectedClass = this.apiData.tags.includes("Active") ? "lbh-tag" : "lbh-tag--grey";
        cy.get(".apiPreview").find(".title > span.govuk-tag").first().should(($tag) => {
            const tagText = $tag.text();
            const expectedTagText = this.apiData.tags.includes("Active") ? "Active" : "Inactive";
            expect(tagText).to.equal(expectedTagText);
        }).should('have.class', expectedClass);
    });

    it("View environment status tags", function () {
        const expectedEnvTagsNo = 3;
        cy.get(".apiPreview").find(".tags").first().children()
            .should('have.length', expectedEnvTagsNo)
            .each((tag) => {
                if (this.apiData.tags.includes(tag.text())){
                    expect(tag).to.have.class("lbh-tag--green");
                } else {
                    expect(tag).to.have.class("lbh-tag--grey");
                }
            });
    });

    it("When the user clicks on an API name they are directed to the SwaggerHub page", function() {
        cy.get(".apiPreview").find("a").first().click();
        const expectedUrl = this.apiData.properties[0].url.replace("api", "app");
        cy.url().should('include', expectedUrl);
    });

});