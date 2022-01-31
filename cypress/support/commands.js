// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', () => {
  const mockToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjI4OTU2NTI2MTE1MDA3NTIxNzAiLCJlbWFpbCI6InRlc3RAaGFja25leS5nb3YudWsiLCJpc3MiOiJIYWNrbmV5IiwibmFtZSI6IkhhY2tuZXkgVGVzdCIsImdyb3VwcyI6WyJURVNUX0dST1VQIl0sImp0aSI6IjRlZmUyMDA4LTc4NmMtNDE1Ni05MGJhLTJjM2UxMzk4ZDhmNSIsImlhdCI6MTYxODgyOTA5NSwiZXhwIjoxNjE4ODMyNjk1fQ._7PXGUtfR7VaxJoulWxRkkawfqJiRg47Ys4KnqxRGkA'
  const parseToken = () => {
    try {
      const decodedToken = jwtDecode(mockToken);
      return decodedToken;
    } catch(e) {
      return null;
    }
  }
  cy.visit('/login')
  cy.setCookie('hackneyToken', mockToken)
  cy.getCookie('hackneyToken').should('have.property', 'value', mockToken)
  cy.visit('/')
})

Cypress.Commands.add('nextPage', () => {
  cy.visit('/login')
  cy.setCookie('hackneyToken', mockToken)
  cy.getCookie('hackneyToken').should('have.property', 'value', mockToken)
  cy.visit('/')
})

Cypress.Commands.add('previousPage', () => {
  cy.visit('/login')
  cy.setCookie('hackneyToken', mockToken)
  cy.getCookie('hackneyToken').should('have.property', 'value', mockToken)
  cy.visit('/')
})

Cypress.Commands.add('testIfLimitedToSignedInUsers', (path) => {
  cy.visit(path);
  cy.url().should("eq", Cypress.config().baseUrl + "/");
})
