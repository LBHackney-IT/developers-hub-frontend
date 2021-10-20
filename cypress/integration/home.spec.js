 describe("Integration test for Home page", () => {
   before(() => {
   cy.visit("http://localhost:3000/");
  })

   it("Navbar is properly rendered", () => {
    cy.get(".lbh-header");
     cy.contains("APIS");
     cy.contains("SIGN IN");
  })

   it("Sidebar is properly rendered", () => {
     cy.get(".sidebar");
     cy.contains("CONTENTS");

   })

   it("Footer properly rendered", () => {
    cy.get("#app-footer");
     cy.contains("Hackney sites");
     cy.contains("Accessibility");
     cy.contains("Contact us");
  })
 })
