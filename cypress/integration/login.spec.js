const testUser = {
  "login-email": "alh@gmail.com",
  "login-pass": "pass123"
};

describe("Unit Test login page", () => {
  it("Logs user in", () => {
    cy.visit("/login");

    for (const prop in testUser) {
      cy.get(`#${prop}`).type(testUser[prop]);
    }

    cy.get("button[type='submit']").click();

    cy.url().should("include", "/");
  });
});
