describe("Add or edit an application that consumes an API", () => {
	beforeEach(function () {
		cy.login();

		// Stub API responses
		cy.intercept("GET", /apis\/Hackney\/\D+\/?$/gm, { fixture: "testApiVersions" }).as("getApiVersions");

		cy.fixture("testApiSwagger").then((swaggerData) => {
			this.swaggerData = swaggerData;
			cy.intercept({ method: "GET", url: /apis\/Hackney\/\D+\/(\d|.)+/gm }, swaggerData).as("getSwaggerInfo");
		});

		cy.fixture("testApi").then((apiData) => {
			this.apiData = apiData;
			cy.intercept({ method: "GET", url: /api\/v1/gm }, apiData).as("getApiInfo");
		});

		cy.intercept({ method: "PATCH", url: /api\/v1/gm }, { statuscode: 204 }).as('addApplication');

		cy.visit("/api-catalogue/testApi");
		cy.wait(["@getApiVersions", "@getSwaggerInfo", "@getApiInfo"]);
	});

	describe("Can add a new application", () => {	
		it("Can navigate to the new application form", function () {
			cy.contains("Add a new application").click();
			cy.contains("Add Application").should("be.visible");
		});
	
		it("Shows an announcement when application is added successfully", () => {
			cy.contains("Add a new application").click();
			cy.get('#name').type('application4')
			cy.contains("Save and Continue").click();
			cy.get('.lbh-page-announcement').contains("Successfully added!").should('be.visible');
		})
	
		it('Calls the PATCH endpoint when adding an application', () => {
			cy.contains("Add a new application").click();
			cy.get('#name').type('application4')
			cy.contains("Save and Continue").click();
			cy.get('@addApplication.all').should('have.length', 1);
		})
	});
	
	describe("Can edit an application", () => {
		it("Can navigate to the edit application form", function () {
			cy.get(".govuk-summary-list__actions .edit-link").first().click();
			cy.contains("Edit Application").should("be.visible");
		});

		it("Prepopulates the name & link of the application in the form", () => {
			cy.get(".govuk-summary-list__actions .edit-link").first().click();
			cy.get("#name").should("have.value", "application1");
		});

		it("Shows an announcement when application is edited successfully", () => {
			cy.get(".govuk-summary-list__actions .edit-link").first().click();
			cy.get('#name').type('application4')
			cy.contains("Save and Continue").click();
			cy.get('.lbh-page-announcement').contains("Successfully edited!").should('be.visible');
		})

		it('Calls the PATCH endpoint when editing an application', () => {
			cy.get(".govuk-summary-list__actions .edit-link").first().click();
			cy.get('#name').type('application4')
			cy.contains("Save and Continue").click();
			cy.get('@addApplication.all').should('have.length', 1);
		})
	});

	it("Goes back to previous page when form is submitted", () => {
		cy.contains("Add a new application").click();
		cy.get('#name').type('application4')
		cy.contains("Save and Continue").click();
		cy.url().should("eq", "http://localhost:3000/api-catalogue/testApi");
	});

	it("Shows a warning when attempting to cancel a change", () => {
		cy.contains("Add a new application").click();
		cy.contains("Cancel").click();
		cy.get('.lbh-dialog').should('be.visible');
	});

	//TODO: Add test for API error handling

	describe("Form Validation", () => {
		// TODO: Add tests for form input validation
	});
})