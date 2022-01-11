// NOTE: COMMENTED TILL HACKNEY AUTOMATED USER CAN BE VERIFIED

// import { screenSizes } from "../support/screenSizes";

// describe("API Information Page is limited to signed in users", () => {
//     it("Redirects to homepage if user is not signed in", () => {
//         cy.testIfLimitedToSignedInUsers("/api-catalogue/api/testApi");
//     });
// });

// describe("View API Information page", () => {

//     beforeEach(function () {
//         cy.login()
//         // Stub API responses
//         cy.intercept('GET', '/specs*', {fixture: "allApis"}).as("getAllApis");
//         cy.fixture("testApi").then((apiData) => {
//             this.apiData = apiData;
//             cy.intercept({method: 'GET', url: /apis/gm}, apiData).as("getApiInfo");
//         });

//         cy.visit("/api-catalogue");
//         cy.get(".apiPreview").find("a").first().click();
//         // navigate from API Catalogue
//     });

//     it("Navigate directly to page", function() {
//         cy.visit("/api-catalogue/api/testApi");
//         const expectedUrl = this.apiData.basePath.split("/")[2];
//         cy.url().should('include', expectedUrl);

//     });

//     screenSizes.forEach((screenSize) => {
//         it(`View title and description on ${screenSize} screen`, function() {
//             cy.viewport(screenSize);
//             cy.contains(this.apiData.info.title).should('be.visible');
//             cy.contains(this.apiData.info.description).should('be.visible');
//         });

//         it(`View environment status tags on ${screenSize} screen`, function () {
//             cy.viewport(screenSize);
//             const expectedEnvTagsNo = 4;
//             cy.get(".sidePanel").find(".env-tags").first().children()
//                 .should('have.length', expectedEnvTagsNo)
//                 .each((tag) => {
//                     const tagText = tag.text();
//                     if (this.apiData.tags.filter( apiTag => apiTag.name === tagText).length > 0){
//                         var tagColour;
//                         switch(tagText){
//                             case "Development":
//                                 tagColour = "yellow"; break;
//                             case "Staging":
//                                 tagColour = "yellow"; break;
//                             case "Production":
//                                 tagColour = "green"; break;
//                             case "Deprecated":
//                                 tagColour = "red"; break;
//                         }
//                         expect(tag).to.have.class(`lbh-tag--${tagColour}`);
//                     } else {
//                         expect(tag).to.have.class(`lbh-tag--${tagText === "Deprecated"? "hidden" : "grey"}`);
//                     }
//                 });
//         });
//     })

//     it("Should automatically have API version selected", function() {
//         cy.get('select#VersionNo option:selected').should('have.text', this.apiData.info.version);
//         cy.contains("SwaggerHub").click();
//         const expectedUrl = this.apiData.basePath;
//         cy.url().should('include', expectedUrl);
//     });

//     it("Can choose API version", function() {
//         const selectedVersion = "2.0.0";
//         cy.get('select').select(selectedVersion);
//         cy.get('select#VersionNo option:selected').should('have.text', selectedVersion);
//     });

// });

// describe("Test error response", () => {
//     it("View error response if API error occurs", () => {
//         cy.login();
//         cy.intercept('GET', '/specs*', {fixture: "allApis"}).as("getAllApis");
//         cy.intercept({method: 'GET', url: /apis/gm}, { statusCode: 500 })

//         cy.visit("/api-catalogue");
//         cy.get(".apiPreview").find("a").first().click();

//         cy.get(".lbh-error-summary").should('be.visible');
//     });
// });
