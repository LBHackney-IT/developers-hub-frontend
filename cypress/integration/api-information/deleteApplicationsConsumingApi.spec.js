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
            cy.intercept({method: 'GET', url: /api\/v\d/gm}, apiData).as("getApiInfo");
        });

        cy.intercept({method: 'DELETE', url: /api\/v\d/gm}, {statusCode: 200}).as("deleteApplication");

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

    it('Deleting an application calls the DELETE endpoint', function() {
        var applicationName = this.apiData.applications[0].name;
        cy.contains(applicationName).parent().parent().find(".delete-link").click();
        cy.contains("Yes, remove").click();

        cy.get('@deleteApplication.all').should('have.length', 1);
    })

    it('Displays an error message if the DELETE endpoint fails', function() {
        var applicationName = this.apiData.applications[0].name;
        cy.contains(applicationName).parent().parent().find(".delete-link").click();
        cy.intercept({method: 'DELETE', url: /api\/v\d/gm}, {statusCode: 500}).as("failedDeleteApplication");
        cy.contains("Yes, remove").click();
        cy.get('.lbh-dialog__close').click();
        cy.get('.govuk-error-summary').should('exist');
    })
})
