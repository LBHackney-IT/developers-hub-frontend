describe("App Routing", function (){
    it("View not found page if navigating to a page that doesn't exist", function(){
        cy.visit("/page-that-doesnt-exist")
        // act
        cy.get(".lbh-error-summary.secondary").should('be.visible');
        cy.get(".govuk-error-summary__body").should("contain", "404: Page not Found");
        // assert
    });
})