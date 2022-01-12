describe('Testing that the Api Authentication Pages loads correctly', () => {
    it('API Authentication page renders', () => {
        // assert
        cy.visit('/#api-authentication')
        cy.get('h3').contains('What is an API Authentication').should('be.visible');
         // act

    
    });
    it('how the authentication works page renders', () => {
        cy.visit('/#how-the-authentication-works');
        cy.get('.center').should('be.visible');
    });
    it('setting up authenticator page renders', () => {
        cy.visit('/#setting-up-api-authenticator');
        cy.get('.center').should('be.visible');
    });
    it('amend access to an api page renders', () => {
        cy.visit('/#how-to-amend-acess-to-an-api')
        cy.get('.center').should('be.visible');
    });

});
