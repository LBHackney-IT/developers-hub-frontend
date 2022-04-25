import { screenSizes } from "../support/screenSizes";

describe("View API Information page", () => {
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

  it("Navigate to page through API Catalogue", function () {
    cy.intercept("GET", "/specs*", { fixture: "allApis" }).as("getAllApis");
    cy.visit("/api-catalogue");
    cy.get(".apiPreview").find("a").first().click();
    const expectedUrl = this.swaggerData.basePath.split("/")[2];
    cy.url().should("include", expectedUrl);
  });

  screenSizes.forEach((screenSize) => {
    it(`View title and description on ${screenSize} screen`, function () {
      cy.viewport(screenSize);
      cy.contains(this.apiData.apiName).should("be.visible");
      cy.contains(this.apiData.description).should("be.visible");
    });

    it(`View environment status tags on ${screenSize} screen`, function () {
      cy.viewport(screenSize);
      const expectedEnvTagsNo = 4;
      cy.get(".sidePanel")
        .find(".env-tags")
        .first()
        .children()
        .should("have.length", expectedEnvTagsNo)
        .each((tag) => {
          const tagText = tag.text();
          if (this.swaggerData.tags.some((apiTag) => apiTag.name === tagText)) {
            var tagColour;
            switch (tagText) {
              case "Development":
                tagColour = "yellow";
                break;
              case "Staging":
                tagColour = "yellow";
                break;
              case "Production":
                tagColour = "green";
                break;
              case "Deprecated":
                tagColour = "red";
                break;
            }
            expect(tag).to.have.class(`lbh-tag--${tagColour}`);
          } else {
            expect(tag).to.have.class(
              `lbh-tag--${tagText === "Deprecated" ? "hidden" : "grey"}`
            );
          }
        });
    });

    it(`View API Base URLs on ${screenSize} screen`, function () {
      cy.viewport(screenSize);
      cy.contains(this.apiData.developmentBaseURL).should("be.visible");
      cy.contains(this.apiData.stagingBaseURL).should("be.visible");
    });

    it(`View relevant links on ${screenSize} screen`, function () {
      cy.viewport(screenSize);

      var links = [
        {
          text: `${this.apiData.apiName} Specification`,
          url: this.apiData.apiSpecificationLink,
        },
        { text: "GitHub Repository", url: this.apiData.githubLink },
      ];

      links.forEach((link) => {
        cy.contains(link.text).click();
        cy.url().should("eq", link.url);
        cy.go("back");
      });
    });

    it(`View applications that utilise an API on ${screenSize} screen`, function () {
      cy.viewport(screenSize);
      cy.contains("Applications that utilise this API");

      this.apiData.applications.forEach((applicationData) => {
        cy.contains(applicationData.name).click();
        if (applicationData.link) {
          cy.url().should("eq", applicationData.link);
          cy.go("back");
        }
      });
    });
  });

  it("Should automatically have API version selected", function () {
    cy.get("select#VersionNo option:selected").should(
      "have.text",
      this.swaggerData.info.version
    );
    cy.get("a").contains("SwaggerHub").click();
    const expectedUrl = this.swaggerData.basePath;
    cy.url().should("include", expectedUrl);
  });

  it("Can choose API version", function () {
    const selectedVersion = "2.0.0";
    cy.get("select").select(selectedVersion);
    cy.get("select#VersionNo option:selected").should(
      "have.text",
      selectedVersion
    );
  });

  describe("Delete an application from an API", () => {
    it("Displays a warning when a user selects to delete an application", function () {
      var applicationName = this.apiData.applications[0].name;
      cy.contains(applicationName)
        .parent()
        .parent()
        .find(".delete-link")
        .click();
      cy.get(".lbh-page-announcement--warning")
        .should("be.visible")
        .should("contain", `remove ${applicationName}`);
    });

    it("Allows a user to cancel deleting an application", function () {
      cy.get(".govuk-summary-list__actions .delete-link").first().click();
      cy.get(".exit-button").click();
      cy.get(".lbh-page-announcement--warning").should("not.be.visible");
    });

    // TODO: Add test for API Call here

    it("Shows a confirmation alert after deleting an application", function () {
      cy.get(".govuk-summary-list__actions .delete-link").first().click();
      cy.get(".lbh-button").contains("Save").click();
      cy.get(".lbh-page-announcement")
        .contains("Deletion successful!")
        .should("be.visible");
    });

    it("Only shows confirmation dialog once per application", function () {
      cy.get(".govuk-summary-list__actions .delete-link").click({
        multiple: true,
      });
      cy.get(".govuk-summary-list__actions .delete-link").first().click();
      cy.get(".lbh-page-announcement--warning").should(
        "have.length",
        this.apiData.applications.length
      );
    });
  });
});

describe("Edge Cases", () => {
  beforeEach(function () {
    cy.login();
    cy.intercept("GET", "/specs*", { fixture: "allApis" }).as("getAllApis");
  });

  it("Shows error response if Swagger API error occurs, but swagger link is still visible", function () {
    cy.intercept(
      { method: "GET", url: /api\/v1/gm },
      { fixture: "testApi.json" }
    ).as("getApiInfo");
    cy.intercept({ method: "GET", url: /apis/gm }, { statusCode: 500 }).as(
      "getSwaggerInfo"
    );
    // arrange
    cy.visit("/api-catalogue");
    cy.get(".apiPreview").find("a").first().click();
    // act
    cy.get(".lbh-error-summary").should("be.visible");
    cy.get(".govuk-error-summary__body").should(
      "contain",
      "Request failed with status code 500"
    );
    cy.get(".env-tags").should(
      "contain",
      "Sorry, we're having difficulty loading this data"
    );

    cy.contains("SwaggerHub Specification")
      .next(".govuk-table__cell")
      .should("contain", "on SwaggerHub");
    // assert
  });

  it("Shows error response if API error occurs", function () {
    cy.intercept(
      { method: "GET", url: /apis/gm },
      { fixture: "testApiSwagger.json" }
    ).as("getSwaggerInfo");
    cy.intercept({ method: "GET", url: /api\/v1/gm }, { statusCode: 500 }).as(
      "getApiInfo"
    );
    // arrange
    cy.visit("/api-catalogue");
    cy.get(".apiPreview").find("a").first().click();
    // act
    cy.get(".lbh-error-summary").should("be.visible");
    cy.get(".govuk-error-summary__body").should(
      "contain",
      "Request failed with status code 500"
    );

    const tableHeaders = [
      "Development Base URL",
      "Staging Base URL",
      "Relevant Links",
    ];
    tableHeaders.forEach((header) => {
      cy.contains(header)
        .next(".govuk-table__cell")
        .should("contain", "We're having difficulty loading this data");
    });
    cy.contains("SwaggerHub Specification")
      .next(".govuk-table__cell")
      .should("contain", "on SwaggerHub");
    // assert
  });

  it("Shows error response if both APIs have errors", function () {
    cy.intercept({ method: "GET", url: /api\/v1/gm }, { statusCode: 500 }).as(
      "getApiInfo"
    );
    cy.intercept({ method: "GET", url: /apis/gm }, { statusCode: 500 }).as(
      "getSwaggerInfo"
    );
    // arrange
    cy.visit("/api-catalogue");
    cy.get(".apiPreview").find("a").first().click();
    cy.wait(["@getSwaggerInfo", "@getApiInfo"]);
    // act
    cy.get(".lbh-error-summary").should("be.visible");
    cy.get(".govuk-error-summary__body").should(
      "contain",
      "Error: Request failed with status code 500 | Error: Request failed with status code 500"
    );
    // assert
  });

  it("Shows environment tags that are case insensitive", function () {
    cy.fixture("testApiSwagger").then((apiSwagger) => {
      const devTagIndex = apiSwagger.tags.findIndex(
        (x) => x.name == "Development"
      );
      apiSwagger.tags[devTagIndex] = {
        name: "dEveLOPmenT",
        description:
          "Marks this API as available in its development enviroment.",
      };
      cy.intercept("GET", /apis/gm, apiSwagger).as("getSwaggerInfo");
    });
    cy.intercept(
      { method: "GET", url: /api\/v1/gm },
      { fixture: "testApi.json" }
    ).as("getApiInfo");
    // arrange
    cy.visit("/api-catalogue");
    cy.get(".apiPreview").find("a").first().click();
    // act
    cy.get(".lbh-tag")
      .contains("Development")
      .should("have.class", "lbh-tag--yellow");
    // assert
  });

  it("View not found page if both APIs return 404", function () {
    cy.intercept({ method: "GET", url: /api\/v1/gm }, { statusCode: 404 }).as(
      "getApiInfo"
    );
    cy.intercept({ method: "GET", url: /apis/gm }, { statusCode: 404 }).as(
      "getSwaggerInfo"
    );
    // arrange
    cy.visit("/api-catalogue");
    cy.get(".apiPreview").find("a").first().click();
    // act
    cy.wait(["@getSwaggerInfo", "@getApiInfo"]);
    cy.get(".lbh-error-summary.secondary").should("be.visible");
    cy.get(".govuk-error-summary__body").should(
      "contain",
      "404: Page not Found"
    );
    // assert
  });

  it("View applications not found response if no applications utilise an API", function () {
    cy.fixture("testApi").then((apiData) => {
      apiData.applications = [];
      cy.intercept({ method: "GET", url: /api\/v1/gm }, apiData).as(
        "getApiInfo"
      );
    });
    cy.intercept(
      { method: "GET", url: /apis/gm },
      { fixture: "testApiSwagger.json" }
    ).as("getSwaggerInfo");

    cy.visit("/api-catalogue");
    cy.get(".apiPreview").find("a").first().click();
    // navigate from API Catalogue
    cy.contains("No applications found.");
  });

  it("Hide Edit & Delete application buttons if user is not in the allowed groups", function () {
    cy.intercept(
      { method: "GET", url: /apis/gm },
      { fixture: "testApiSwagger.json" }
    ).as("getSwaggerInfo");
    cy.intercept(
      { method: "GET", url: /api\/v1/gm },
      { fixture: "testApi.json" }
    ).as("getApiInfo");

    cy.removeGroup();
    cy.visit("/api-catalogue");
    cy.get(".apiPreview").find("a").first().click();
    // navigate from API Catalogue

    cy.wait("@getApiInfo");
    cy.get(".govuk-summary-list__actions").should("not.exist");
  });

  describe("Add new application button is working", () => {
    it("Add Application button is visible", function () {
      cy.intercept(
        { method: "GET", url: /apis/gm },
        { fixture: "testApiSwagger.json" }
      ).as("getSwaggerInfo");
      cy.intercept(
        { method: "GET", url: /api\/v1/gm },
        { fixture: "testApi.json" }
      ).as("getApiInfo");
      cy.visit("/api-catalogue");
      cy.get(".apiPreview").find("a").first().click();
      cy.get(".lbh-button").click();

      cy.contains("Application Name").should("be.visible");
    });

    it.only("Goes back to previous back when form is submitted", () => {
      cy.intercept(
        { method: "GET", url: /apis/gm },
        { fixture: "testApiSwagger.json" }
      ).as("getSwaggerInfo");
      cy.intercept(
        { method: "GET", url: /api\/v1/gm },
        { fixture: "testApi.json" }
      ).as("getApiInfo");
      cy.visit("/api-catalogue");
      cy.get(".apiPreview").find("a").click();
      cy.get(".lbh-button").click();
      cy.get(".lbh-button").click();
    });
  });
});
