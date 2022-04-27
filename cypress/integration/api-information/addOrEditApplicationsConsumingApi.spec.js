describe("Add new application button is working", () => {
  beforeEach(function () {
    cy.login();

    // Stub API responses
    cy.intercept("GET", /apis\/Hackney\/\D+\/?$/gm, {
      fixture: "testApiVersions",
    }).as("getApiVersions");
    cy.fixture("testApiSwagger").then((swaggerData) => {
      this.swaggerData = swaggerData;
      cy.intercept(
        { method: "GET", url: /apis\/Hackney\/\D+\/(\d|.)+/gm },
        swaggerData
      ).as("getSwaggerInfo");
    });
    cy.fixture("testApi").then((apiData) => {
      this.apiData = apiData;
      cy.intercept({ method: "GET", url: /api\/v1/gm }, apiData).as(
        "getApiInfo"
      ); 
    });
    cy.intercept({ method: "PATCH", url: /api\/v1/gm }, {statuscode: 204}).as('addApplication');

    cy.visit("/api-catalogue/testApi");
    cy.wait(["@getApiVersions", "@getSwaggerInfo", "@getApiInfo"]);
  });

  it("Add Application button is visible", function () {
    cy.contains("Add a new application").click();
    cy.contains("Add A New Application").should("be.visible");
  });

  it("Goes back to previous back when form is submitted", () => {
    cy.contains("Add a new application").click();
    cy.contains("Save and Continue").click();
    cy.url().should("eq", "http://localhost:3000/api-catalogue/testApi");
  });

  it.only("Shows the announcement when application is added successfully", () => {
    cy.contains("Add a new application").click();
    cy.get('#name').type('application4')
    cy.contains("Save and Continue").click();
    cy.get('.lbh-page-announcement').contains("Success").should('be.visible');
  })

  // Add tests for API
  it('Calls the PATCH endpoint when adding an application', () => {
    cy.contains("Add a new application").click();
    cy.get('#name').type('application4')
    cy.contains("Save and Continue").click();
    cy.get('@addApplication.all').should('have.length', 1);
  })
});

describe("Can edit an application", () => {
  beforeEach(function () {
    cy.login();

    // Stub API responses
    cy.intercept("GET", /apis\/Hackney\/\D+\/?$/gm, {
      fixture: "testApiVersions",
    }).as("getApiVersions");

    cy.fixture("testApiSwagger").then((swaggerData) => {
      this.swaggerData = swaggerData;
      cy.intercept(
        { method: "GET", url: /apis\/Hackney\/\D+\/(\d|.)+/gm },
        swaggerData
      ).as("getSwaggerInfo");
    });

    cy.fixture("testApi").then((apiData) => {
      this.apiData = apiData;
      cy.intercept({ method: "GET", url: /api\/v1/gm }, apiData).as(
        "getApiInfo"
      );
    });

    cy.visit("/api-catalogue/testApi");
    cy.wait(["@getApiVersions", "@getSwaggerInfo", "@getApiInfo"]);
  });

  // TESTS HERE

  it("Prepopulates the name of the application in the form", () => {
    cy.get(".govuk-summary-list__actions .edit-link").first().click();
    cy.get("#name").should("have.value", "application1");
  });

  it("Warning when attempt to cancel change", () => {
    cy.contains("Add a new application").click();
    cy.get("#cancel").click();
    cy.get('.lbh-dialog').should('be.visible');
  });

  
});
