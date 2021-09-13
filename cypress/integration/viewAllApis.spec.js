describe("View all APIs", () => {

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

    it('View the last page', () => {
        visitLastPageIfPossible();
        cy.get('.lbh-pagination__link').contains("Next").should('have.class', 'disabled');
        testResultsSummary();        
    });
  })