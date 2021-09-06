describe("View all APIs", () => {

    it("View title", () => {
        cy.visit("/apis");
        cy.contains("All APIs").should('be.visible');
    });
    
    it("View 5 APIs by default", () => {
        const expectedCount = 5;
        cy.get('ul#apisList').get('li.apiPreview').should('have.length', expectedCount);
    });
    
});