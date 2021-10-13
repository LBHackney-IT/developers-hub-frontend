describe("Preview an API", () => {

    beforeEach(function () {
        // cy.login()
        // Stub API response
        cy.fixture("allApis").then((allApis) => {
            this.apiData = allApis.apis[0];
            cy.intercept('GET', '/specs*', allApis).as("getAllApis");
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
        const isPublished = this.apiData.properties.filter( property => property.type === "X-Published")[0].value.toLowerCase() == "true";
        const expectedClass = isPublished ? "lbh-tag" : "lbh-tag--grey";
        cy.get(".apiPreview").find(".title > span.govuk-tag").first().should(($tag) => {
            const tagText = $tag.text();
            const expectedTagText = isPublished ? "Active" : "Inactive";
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
        const apiUrl = this.apiData.properties.filter( property => property.type === "Swagger")[0].url;
        const expectedUrl = apiUrl.replace("api", "app");
        cy.url().should('include', expectedUrl);
    });

});
