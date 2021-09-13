describe("View API Catalogue page", () => {

    it("View title", () => {
        cy.visit("/api-catalogue");
        cy.contains("API Catalogue").should('be.visible');
    });
    
    it("View 5 APIs by default", () => {
        const expectedCount = 5;
        cy.get('ul#apisList').get('li.apiPreview').should('have.length', expectedCount);
    });
    
});

describe('All APIs Pagination', () => {
    const visitLastPageIfPossible = () => {
        // iterate recursively until the "Next" link is disabled
        cy.get('.lbh-pagination__link').contains("Next").then(($next) => {
        if ($next.hasClass('disabled')) {
            // we are on the last page
            return
        }
        
        cy.wait(500); // just for clarity
        cy.get('.lbh-pagination__link').contains("Next").click();
        visitLastPageIfPossible();
        })
    }

    const testResultsSummary = () => {
        // checks if results summary reflects the number of APIs shown on page
        cy.get('ul#apisList').get('li.apiPreview').then( $results => {
            const resultsNo = $results.length;
            cy.get('.lbh-pagination__summary').should(($summary) => {
                const resultsSummary = $summary.text().split(" ")[1].split("-").map( x => parseInt(x));
                expect(resultsSummary[0]+resultsNo).to.equal(resultsSummary[1]+1);
            });
        });
    }
    
    it('View the first page', () => {
        cy.visit("/api-catalogue");
        cy.get('.lbh-pagination__link').contains("Previous").should('have.class', 'disabled');
        testResultsSummary();        
    });

    it("View a specific page", () => {
        cy.get('#pagination-link-0').should('have.class', "lbh-pagination__link--current");
        cy.get('#pagination-link-1').click();
        cy.get('#pagination-link-1').should('have.class', "lbh-pagination__link--current");
    });

    it('View the last page', () => {
        visitLastPageIfPossible();
        cy.get('.lbh-pagination__link').contains("Next").should('have.class', 'disabled');
        testResultsSummary();
    });
});

describe("Filter APIs", () => {

    beforeEach(function () {
        // Stub API response
        cy.fixture("allApis").then((allApis) => {
            this.apiData = allApis.apis[0];
            cy.intercept('GET', '/specs*', allApis).as("getApis");
        });
    });

    it("View all APIs by default", () => {
        cy.visit("/api-catalogue");
        cy.wait('@getApis').its('request.url').should('include', 'state=ALL');
        cy.get("#filterApis-0").should("be.checked");
    });

    it("View active APIs", () => {
        cy.get("#filterApis-1").check();
        cy.wait('@getApis').its('request.url').should('include', 'state=PUBLISHED');
    });

    it("View inactive APIs", () => {
        cy.get("#filterApis-2").check();
        cy.wait('@getApis').its('request.url').should('include', 'state=UNPUBLISHED');
    });

    it("Click on radio labels to select an API filter", () => {
       cy.get(".govuk-radios__label").contains("Active APIs").click();
       cy.wait('@getApis').its('request.url').should('include', 'state=PUBLISHED');
    });
});

describe("Pagination + Filters", () => {
    it("When switching filters, pagination is reset", () => {
        cy.visit("/api-catalogue");

        cy.get('#pagination-link-0').should('have.class', "lbh-pagination__link--current");
        cy.get('#pagination-link-1').click();
        cy.get('#pagination-link-1').should('have.class', "lbh-pagination__link--current");

        cy.get("#filterApis-2").check();
        cy.get('#pagination-link-1').should('not.have.class', "lbh-pagination__link--current");
        cy.get('#pagination-link-0').should('have.class', "lbh-pagination__link--current");
    });
});
