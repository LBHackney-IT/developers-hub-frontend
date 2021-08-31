describe("View all APIs", () => {

    it("View title", () => {
        cy.visit("/apis");
        cy.contains("All APIs").should('be.visible');
    });
    
    it("View 10 APIs by default", () => {
        const expectedCount = 10;
        cy.get('ul').get('li').should('have.length', expectedCount);
    });
});