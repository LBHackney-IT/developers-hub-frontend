import { screenSizes } from "../../support/screenSizes";

describe("View API Information page", () => {
    beforeEach(function () {
        cy.login()

        // Stub API responses
        cy.intercept("apis/Hackney/testApi", { fixture: "testApiVersions" }).as("getApiVersions");
        cy.fixture("testApiSwagger").then((swaggerData) => {
            this.swaggerData = swaggerData;
            cy.intercept("apis/Hackney/testApi/**", swaggerData).as("getSwaggerInfo");
        });
        cy.fixture("testApi").then((apiData) => {
            this.apiData = apiData;
            cy.intercept({method: 'GET', url: /api\/v\d/gm}, apiData).as("getApiInfo");
        });

        cy.visit("/api-catalogue/testApi");
        cy.wait(["@getApiVersions","@getSwaggerInfo", "@getApiInfo"]);
    });

    it("Navigate to page through API Catalogue", function() {
        cy.intercept('GET', '/specs*', {fixture: "allApis"}).as("getAllApis");
        cy.visit("/api-catalogue");
        cy.get(".apiPreview").find("a").first().click();
        const expectedUrl = this.swaggerData.basePath.split("/")[2];
        cy.url().should('include', expectedUrl);
    });

    screenSizes.forEach(screenSize => {
		it(`View title and description on ${screenSize} screen`, function() {
            cy.viewport(screenSize);
            cy.contains(this.apiData.apiName).should('be.visible');
            cy.contains(this.apiData.description).should('be.visible');
        });

      	it(`View environment status tags on ${screenSize} screen`, function () {
			cy.viewport(screenSize);
			const expectedEnvTagsNo = 4;
			cy.get(".sidePanel").find(".env-tags").first()
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
					tagColour = "amber";
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
				expect(tag).to.have.class(`lbh-tag--${tagText === "Deprecated" ? "hidden" : "grey"}`);
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
			  { text: `${this.apiData.apiName} Specification`, url: this.apiData.apiSpecificationLink },
			  { text: "GitHub Repository", url: this.apiData.githubLink }
			];
		
			links.forEach(link => {
				cy.contains(link.text).click();
				cy.url().should("eq", link.url);
				cy.go("back");
			})
		})

		it(`View applications that utilise an API on ${screenSize} screen`, function() {
			cy.viewport(screenSize);
			cy.contains("Applications that utilise this API")
			
			this.apiData.applications.forEach((applicationData) => {
				cy.contains(applicationData.name).click();
				if(applicationData.link){
					cy.url().should("eq", applicationData.link)
					cy.go('back');
				}
			})
  		})
	})

	it("Should automatically have API version selected", function() {
		cy.get('select#VersionNo option:selected').should('have.text', this.swaggerData.info.version);
		cy.get("a").contains("SwaggerHub").click();
		const expectedUrl = this.swaggerData.basePath;
		cy.url().should('include', expectedUrl);
	});

	it("Can choose API version", function() {
        const selectedVersion = "2.0.0";
        cy.get('select').select(selectedVersion);
        cy.get('select#VersionNo option:selected').should('have.text', selectedVersion);
    });
});


describe("Edge Cases", () => {
  	beforeEach(function () {
		cy.login()
        cy.intercept("apis/Hackney/testApi", {fixture: "testApiVersions"}).as("getApiVersions");
	});

	it("Shows error response if Swagger API error occurs, but swagger link is still visible", function () {
		// arrange
		cy.intercept({ method: "GET", url: /api\/v\d/gm }, { fixture: "testApi.json" }).as("getApiInfo");
        cy.intercept({ method: "GET", url: "apis/Hackney/testApi/**" }, {statusCode: 500}).as("getSwaggerInfo");
		// act
		cy.visit("/api-catalogue/testApi");
		cy.wait(["@getApiVersions", "@getSwaggerInfo", "@getApiInfo"]);
		// assert
		cy.get(".lbh-error-summary").should("be.visible");
		cy.get(".govuk-error-summary__body").should("contain", "Request failed with status code 500");
		cy.get(".env-tags").should("contain", "Sorry, we're having difficulty loading this data");

		cy.contains("SwaggerHub Specification")
		.next(".govuk-table__cell")
		.should("contain", "on SwaggerHub");
	});

	it("Shows error response if API error occurs", function () {
		// arrange
        cy.intercept("apis/Hackney/testApi/**", {fixture: "testApiSwagger"}).as("getSwaggerInfo");
		cy.intercept({ method: "GET", url: /api\/v\d/gm }, { statusCode: 500 }).as("getApiInfo");
		// act
		cy.visit("/api-catalogue/testApi");
		cy.wait(["@getApiVersions", "@getSwaggerInfo", "@getApiInfo"]);
		// assert
		cy.get(".lbh-error-summary").should("be.visible");
		cy.get(".govuk-error-summary__body").should("contain", "Request failed with status code 500");
		
		const tableHeaders = ["Development Base URL","Staging Base URL","Relevant Links",];
		tableHeaders.forEach((header) => {
			cy.contains(header).next(".govuk-table__cell")
				.should("contain", "We're having difficulty loading this data");
		});
		cy.contains("SwaggerHub Specification").next(".govuk-table__cell")
			.should("contain", "on SwaggerHub");
	});

	it("Shows error response if both APIs have errors", function () {
		// arrange
        cy.intercept({ method: "GET", url: "apis/Hackney/testApi/**" }, { statusCode: 500 }).as("getSwaggerInfo");
		cy.intercept({ method: "GET", url: /api\/v\d/gm }, { statusCode: 500 }).as("getApiInfo");
		// act
		cy.visit("/api-catalogue/testApi");
		cy.wait(["@getApiVersions", "@getSwaggerInfo", "@getApiInfo"]);
		// assert
		cy.get(".lbh-error-summary").should("be.visible");
		cy.get(".govuk-error-summary__body").should("contain", "Error: Request failed with status code 500 | Error: Request failed with status code 500");
	});

	it("Shows environment tags that are case insensitive", function () {
		// arrange
		cy.fixture("testApiSwagger").then((apiSwagger) => {
			const devTagIndex = apiSwagger.tags.findIndex((x) => x.name == "Development");
			apiSwagger.tags[devTagIndex] = {
				name: "dEveLOPmenT",
				description: "Marks this API as available in its development enviroment.",
			};
        	cy.intercept({ method: "GET", url: "apis/Hackney/testApi/**" }, apiSwagger).as("getSwaggerInfo");
		});

		cy.intercept({ method: "GET", url: /api\/v\d/gm }, { fixture: "testApi.json" }).as("getApiInfo");
        // act
		cy.visit("/api-catalogue/testApi");
		cy.wait(["@getApiVersions", "@getSwaggerInfo", "@getApiInfo"]);
        // assert
        cy.get(".lbh-tag").contains("Development").should("have.class", "lbh-tag--yellow");
	});

    it("View not found page if both APIs return 404", function(){
        cy.intercept("apis/Hackney/testApi/**", { statusCode: 404 }).as("getSwaggerInfo");
        cy.intercept({method: 'GET', url: /api\/v\d/gm}, { statusCode: 404}).as("getApiInfo");
        // arrange
		cy.visit("/api-catalogue/testApi");
		cy.wait(["@getApiVersions", "@getSwaggerInfo", "@getApiInfo"]);
        // act
        cy.get(".lbh-error-summary.secondary").should('be.visible');
        cy.get(".govuk-error-summary__body").should("contain", "404: Page not Found");
        // assert
    });

    it("View applications not found response if no applications utilise an API", function(){
        cy.fixture("testApi").then((apiData) => {
            apiData.applications = [];
            cy.intercept({method: 'GET', url: /api\/v\d/gm}, apiData).as("getApiInfo");
        });
        cy.intercept("apis/Hackney/testApi/**", { fixture: "testApiSwagger.json"}).as("getSwaggerInfo");
        // arrange

		cy.visit("/api-catalogue/testApi");
		cy.wait(["@getApiVersions", "@getSwaggerInfo", "@getApiInfo"]);
        // act
        cy.contains("No applications found.");
        // assert
    });

    it("Hide Add, Edit & Delete application buttons if user is not in the allowed groups", function() {
        cy.intercept("apis/Hackney/testApi/**", {fixture: "testApiSwagger"}).as("getSwaggerInfo");
        cy.intercept({method: 'GET', url: /api\/v\d/gm}, { fixture: "testApi.json"}).as("getApiInfo");
        cy.removeGroup();
		// arrange
		cy.visit("/api-catalogue/testApi");
		cy.wait(["@getApiVersions", "@getSwaggerInfo", "@getApiInfo"]);
        // act
        cy.get('.govuk-summary-list__actions').should("not.exist");
        cy.get('.lbh-button--add').should("not.exist");
        // assert
    });
});