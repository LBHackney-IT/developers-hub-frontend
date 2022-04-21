describe('Delete an application from an API', () => {
    beforeEach(function () {
        cy.login()

        // Stub API responses
        cy.intercept('GET', /apis\/Hackney\/\D+\/?$/gm, {fixture: "testApiVersions"}).as("getApiVersions");
        cy.fixture("testApiSwagger").then((swaggerData) => {
            this.swaggerData = swaggerData;
            cy.intercept({method: 'GET', url: /apis\/Hackney\/\D+\/(\d|.)+/gm}, swaggerData).as("getSwaggerInfo");
        });
        cy.fixture("testApi").then((apiData) => {
            this.apiData = apiData;
            cy.intercept({method: 'GET', url: /api\/v1/gm}, apiData).as("getApiInfo");
        });

        cy.visit("/api-catalogue/testApi");
        cy.wait(["@getApiVersions","@getSwaggerInfo", "@getApiInfo"]);
    });

    it('Displays a warning when a user selects to delete an application', function() {
        var applicationName = this.apiData.applications[0].name;
        cy.contains(applicationName).parent().parent().find(".delete-link").click();
        cy.get('.lbh-dialog').should('be.visible').should("contain", `remove ${applicationName}`);
    })

    it('Allows a user to cancel deleting an application', function() {
        cy.get('.govuk-summary-list__actions .delete-link').first().click();
        cy.contains('cancel').click();
        cy.get('.lbh-dialog').should('not.exist');
    })

    it('Shows a confirmation alert after deleting an application & removes from list', function() {
        var applicationName = this.apiData.applications[0].name;
        cy.contains(applicationName).parent().parent().find(".delete-link").click();
        cy.contains("Yes, remove").click();

        cy.get('.lbh-page-announcement').contains("Deletion successful!").should('be.visible');
        cy.get('.govuk-summary-list__key').contains(applicationName).should("not.exist");
    })

    it.only('Permanently removes an application from the list, so that it is not there when revisiting the page', function() {
        var applicationName = this.apiData.applications[0].name;
        cy.contains(applicationName).parent().parent().find(".delete-link").click();
        cy.contains("Yes, remove").click();

        cy.get('.lbh-page-announcement').contains("Deletion successful!").should('be.visible');
        cy.visit("/api-catalogue/testApi");
        cy.get('.govuk-summary-list__key').contains(applicationName).should("not.exist");
    })

    // TODO: Add test for API Call here
})
