describe("Accordions for user needs", () => {
    it(" Opens collapses the accordions", () => {
        cy.visit('/#need-of-dev-hub');
        cy.get('.lbh-collapsible').contains('As a Developer').click();
        cy.contains('As a developer I').should('be.visible');
    });
});

  
