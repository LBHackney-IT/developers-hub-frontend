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
			cy.intercept({ method: "GET", url: /api\/v\d/gm }, apiData).as("getApiInfo");
		});

		cy.intercept({ method: "PATCH", url: /api\/v\d/gm }, { statusCode: 204 }).as('addEditApplication');

		cy.visit("/api-catalogue/testApi");
		cy.wait(["@getApiVersions", "@getSwaggerInfo", "@getApiInfo"]);
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

	it("Shows an error message when the API fails", () => {
		cy.intercept({ method: "PATCH", url: /api\/v\d/gm }, { statusCode: 500 }).as("patchFail");
		cy.contains("Add a new application").click();
		cy.get('#name').type('application4')
		cy.contains("Save and Continue").click();

		cy.get(".lbh-error-summary").should("be.visible");
	});

	describe("Can add a new application", () => {	
		it("Can navigate to the new application form", () => {
			cy.contains("Add a new application").click();
			cy.contains("Add Application").should("be.visible");
			cy.url().should("eq", `http://localhost:3000/api-catalogue/testApi/applications/new`);
		});
	
		it("Shows an announcement when application is added successfully", () => {
			cy.contains("Add a new application").click();
			cy.get('#name').type('application4');
			cy.get("#link").type("https://playbook.hackney.gov.uk/");
			cy.contains("Save and Continue").click();

			cy.get('.lbh-page-announcement').contains("Successfully added!").should('be.visible');
		})
	
		it('Calls the PATCH endpoint when adding an application', () => {
			cy.contains("Add a new application").click();
			
			const name = "application4"
			cy.get('#name').clear().type(name)
			cy.contains("Save and Continue").click();

			cy.wait('@addEditApplication').its('request.body').should('have.property', 'name', name);
			cy.get('@addEditApplication').its('request.body').should("not.have.property", 'link');
			cy.get('@addEditApplication.all').should('have.length', 1);
		})
	});
	
	describe("Can edit an application", () => {
		it("Can navigate to the edit application form", function() {
			cy.get(".govuk-summary-list__actions .edit-link").first().click();
			cy.contains("Edit Application").should("be.visible");
			cy.url().should("eq", `http://localhost:3000/api-catalogue/testApi/applications/${this.apiData.applications[0].id}/edit`);
		});

		it("Prepopulates the name & link of the application in the form", function() {
			cy.get(".govuk-summary-list__actions .edit-link").first().click();
			cy.get("#name").should("have.value", this.apiData.applications[0].name);
			cy.get("#link").should("have.value", this.apiData.applications[0].link);
		});

		it("Prepopulates the name & link of the application in the form if visited directly", function() {
			cy.visit(`/api-catalogue/testApi/applications/${this.apiData.applications[0].id}/edit`);
			var applicationData = this.apiData.applications[0];
			cy.intercept({ method: "GET", url: /api\/v\d\/[^\/]+\/[^\/]*\/application/gm }, applicationData).as("getApplicationDetails");
			
			cy.get("#name").should("have.value", applicationData.name);
			cy.get("#link").should("have.value", applicationData.link);
		});

		it("Shows an announcement when application is edited successfully", () => {
			cy.get(".govuk-summary-list__actions .edit-link").first().click();
			cy.get('#name').type('application4')
			cy.contains("Save and Continue").click();
			cy.get('.lbh-page-announcement').contains("Successfully edited!").should('be.visible');
		})

		it('Calls the PATCH endpoint when editing an application', () => {
			cy.get(".govuk-summary-list__actions .edit-link").first().click();

			const updatedName = "application4"
			cy.get('#name').clear().type(updatedName)
			cy.contains("Save and Continue").click();

			cy.wait('@addEditApplication').its('request.body').should('have.property', 'name', updatedName);
			cy.get('@addEditApplication').its('request.body').should("not.have.property", 'link');
			cy.get('@addEditApplication.all').should('have.length', 1);
		})
	});

	describe("Form Validation", () => {
		beforeEach(() => {
			cy.contains("Add a new application").click();
		})

		it("Shows an error if the application name is blank", () => {
			cy.get("#link").type("https://playbook.hackney.gov.uk/");
			cy.get('form').submit();

			cy.get(".lbh-error-message").contains("This field is required");
			cy.get("#name").should("have.class", "govuk-input--error");
			cy.get("#add-edit-application").should("have.class", "govuk-form-group--error");
		});

		it("Does not show an an error if the application link is empty", () => {
			cy.get("#name").type("test application");
			cy.get("#link").should("not.have.class", "govuk-input--error");
			cy.get("#add-edit-application").should("not.have.class", "govuk-input--error");
			cy.get("#add-edit-application").should("not.have.class", "govuk-form-group--error");
		});

		it("Disables the submit button if no changes are made", () => {
			cy.contains("Save and Continue").should("have.attr", "disabled");
		});
	});
})