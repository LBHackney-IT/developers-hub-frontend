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
        cy.get(".apiPreview").find(".title > span.lbh-tag").first().should(($tag) => {
            const tagText = $tag.text();
            const expectedTagText = this.apiData.tags.includes("active") ? "Active" : "Inactive";
            expect(tagText).to.equal(expectedTagText);
        });
    });

    it("View environment status tags", function () {
        cy.get(".apiPreview").find(".tags").first().children()
            .should('have.length', this.apiData.tags.length )
            .each((tag) => {
                expect(tag.text()).to.be.oneOf(this.apiData.tags);
            });
    });

    it("When the user clicks on an API name they are directed to the SwaggerHub page", function() {
        cy.get(".apiPreview").find("h3").first().click();
        expect(cy.url()).to.equal(this.apiData.properties[0].url);
    });

});