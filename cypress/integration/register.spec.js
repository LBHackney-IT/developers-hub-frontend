// const testUser = {
//   "register-firstname": "Alex",
//   "register-lastname": "LastNameHere",
//   "register-org": "Hackney",
//   "register-email": "alh@gmail.com",
//   "register-createpass": "pass123",
//   "register-confirmpass": "pass123"
// };

// it("Registers user", () => {
//   cy.visit("/register");

//   for (const prop in testUser) {
//     cy.get(`#${prop}`).type(testUser[prop]);
//   }

//   cy.get("button[type='submit']").click();
//   cy.url().should("include", "/");
// });
