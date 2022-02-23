const privatePages = ["/api-catalogue", "/api-catalogue?search=some-search", "api-catalogue/some-api"]

describe("App Routing", function (){
    it("View not found page if navigating to a page that doesn't exist", function(){
        cy.visit("/page-that-doesnt-exist")
        // act
        cy.get(".lbh-error-summary.secondary").should('be.visible');
        cy.get(".govuk-error-summary__body").should("contain", "404: Page not Found");
        // assert
    });

    it("Pages that are private are not accessible to unauthenticated users & user is prompted to sign in", function(){
        privatePages.forEach(path => {
            cy.visit(path);
            // assert
            cy.get(".lbh-page-announcement--warning").should("be.visible");
            cy.contains("You cannot access this page");
            
            cy.get(".lbh-button--chevron").contains("Sign in with Google");
            cy.contains("Please log in with your Hackney email account");
            cy.url().should("eq", "http://localhost:3000/login")
        })    
    })
})