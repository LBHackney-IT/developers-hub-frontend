import { screenSizes } from "../support/screenSizes";

describe("View API Catalogue page", () => {

    beforeEach(function () {
        cy.login();
        cy.visit("/api-catalogue");
    });

    screenSizes.forEach((screenSize) => {

        it(`View title on ${screenSize} screen`, () => {
            cy.viewport(screenSize);
            cy.intercept('/specs*').as('getApiDefinitions')
            cy.visit("/api-catalogue");
            cy.wait("@getApiDefinitions");
            cy.contains("API Catalogue").should('be.visible');
        });

        it(`View 5 APIs by default on ${screenSize} screen`, () => {
            cy.viewport(screenSize);
            const expectedCount = 5;
            cy.get('ul#apisList').get('li.apiPreview').should('have.length', expectedCount);
        });

        it(`View error response if API error on ${screenSize} screen`, () => {
            cy.viewport(screenSize);
            cy.intercept('GET', '/specs*', { statusCode: 500 });
            cy.reload();
            cy.get(".lbh-error-summary").should('be.visible');
        });
    })
});

describe('All APIs Pagination', () => {

    beforeEach(function () {
        cy.login();
        cy.visit("/api-catalogue");
        cy.intercept('/specs*').as('getApiDefinitions');
    })

    const visitLastPageIfPossible = () => {
        // iterate recursively until the "Next" link is disabled
        cy.get(".lbh-simple-pagination__link--next").then(($next) => {
        if ($next.hasClass('disabled')) { return } // we are on the last page

        cy.wait(500); // just for clarity
        cy.get(".lbh-simple-pagination__link--next").click();

        cy.wait("@getApiDefinitions");
        visitLastPageIfPossible();
        })
    }

    it('View the first page', () => {
        cy.visit("/api-catalogue");
        cy.wait("@getApiDefinitions");
        cy.get(".lbh-simple-pagination__link--previous").should('have.class', 'disabled');
    });

    it('View the last page', () => {
        visitLastPageIfPossible();
        cy.get(".lbh-simple-pagination__link--next").should('have.class', 'disabled');
    });
});

describe("Filter APIs", () => {

    beforeEach(function () {
        cy.login();
        // Stub API response
        cy.fixture("allApis").then((allApis) => {
            this.apiData = allApis.apis[0];
            cy.intercept('GET', '/specs*', allApis).as("getApis");
        });
        cy.visit("/api-catalogue");
    });

    it("View all APIs by default", () => {
        cy.wait('@getApis').its('request.url').should('include', 'state=ALL');
        cy.get("#filterApis-0").should("be.checked");
    });

    it("View active APIs", () => {
        cy.wait('@getApis');
        cy.get("#filterApis-1").check();
        cy.wait('@getApis').its('request.url').should('include', 'state=PUBLISHED');
    });

    it("View inactive APIs", () => {
        cy.wait('@getApis');
        cy.get("#filterApis-2").check();
        cy.wait('@getApis').its('request.url').should('include', 'state=UNPUBLISHED');
    });

    it("Click on radio labels to select an API filter", () => {
        cy.wait('@getApis');
        cy.get(".govuk-radios__label").contains("Active APIs").click();
       cy.wait('@getApis').its('request.url').should('include', 'state=PUBLISHED');
    });
});

describe("Advanced Query Fields", () => {

    beforeEach( function() {
        cy.login();
        cy.intercept('/specs*').as('getApis');
        cy.visit("/api-catalogue");
        cy.wait("@getApis")
    })

    it("Choose page size", () => {
        const expectedCount = 10;
        cy.get(".govuk-details__summary-text").click();
        cy.get('select#PageSize').select(`${expectedCount} items`);
        cy.wait("@getApis");
        cy.get('ul#apisList').get('li.apiPreview').should('have.length', expectedCount);
    });

    it("View APIs in last modified order by default", () => {
        cy.get(".edited").then(apis => {
            const apiModifiedDates = apis.map((index, html) => Cypress.$(html).text()).get();
            const sortedDates = apiModifiedDates.slice().sort().reverse();
            expect(apiModifiedDates).to.deep.equal(sortedDates);
          });
    });

    it("View APIs in alphabetical order", () => {
        cy.get(".govuk-details__summary-text").click();
        cy.get('select#SortBy').select("A-Z");
        cy.wait("@getApis");

        cy.get("h2").then(apis => {
            const apiTitles = apis.map((index, html) => Cypress.$(html).text().toLowerCase()).get();
            const sortedTitles = apiTitles.slice().sort();
            expect(apiTitles).to.deep.equal(sortedTitles);
          });
    });

    it("View APIs in reverse alphabetical order", () => {
        cy.get(".govuk-details__summary-text").click();
        cy.get('select#SortBy').select("Z-A");
        cy.wait("@getApis");

        cy.get("h2").then(apis => {
            const apiTitles = apis.map((index, html) => Cypress.$(html).text().toLowerCase()).get();
            const sortedTitles = apiTitles.slice().sort().reverse();
            expect(apiTitles).to.deep.equal(sortedTitles);
          });
    });
})

describe("Resetting Pagination", () => {

    beforeEach(function () {
        cy.login();
        cy.visit("/api-catalogue");
    });

    const scenarios = [
        { name: "switching filters", function: () => { cy.get("#filterApis-2").check() } },
        { name: "changing sort by", function: () => { cy.get('select#SortBy').select("A-Z") } },
        { name: "changing page size", function: () => { cy.get('select#PageSize').select("10 items") } }
    ];

    scenarios.forEach((scenario) => {
        it(`When ${scenario.name}, pagination is reset`, () => {
            cy.intercept('/specs*').as('getApiDefinitions');
            cy.visit("/api-catalogue");
            cy.wait("@getApiDefinitions");

            cy.get('.lbh-simple-pagination__title.next').should($nextPage => {
                expect($nextPage.text()).to.contain("2"); // on page 1
            });
            cy.get(".lbh-simple-pagination__link--next").click();
            cy.wait("@getApiDefinitions");
            cy.get('.lbh-simple-pagination__title.next').should($nextPage => {
                expect($nextPage.text()).to.contain("3"); // on page 2
            });
            // Arrange

            cy.get(".govuk-details__summary-text").click();
            scenario.function();
            cy.wait("@getApiDefinitions");
            // Act

            cy.get('.lbh-simple-pagination__title.next').should($nextPage => {
                expect($nextPage.text()).to.contain("2");
                expect($nextPage.text()).to.not.contain("3");
            });
            // Assert
        });
    });
});
