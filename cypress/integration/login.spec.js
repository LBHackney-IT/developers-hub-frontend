// const testUser = {
//   "login-email": "alh@gmail.com",
//   "login-pass": "pass123"
// };

// describe("Unit Test login page", () => {
//   it("Logs user in", () => {
//     cy.visit("/login");

//     for (const prop in testUser) {
//       cy.get(`#${prop}`).type(testUser[prop]);
//     }

//     cy.get("button[type='submit']").click();

//     cy.url().should("include", "/");
//   });
// });

describe("Log in functionality", () => {
  it("Has a SIGN IN button in nav bar", () => {
    cy.visit("/");
    cy.contains('SIGN IN');
  });

  it("Redirects to homepage when signed in", () => {
    cy.login();
    cy.url().should("eq", "http://local.hackney.gov.uk:3000/");
  });

  it("Displays a welcome message when signed in", () => {
    cy.login();
    cy.contains('Welcome');
  });
});
