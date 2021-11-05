const headerItemText = [
  "API CATALOGUE",
  "SIGN IN",
];

const sidebarItemText = [
    "Mission",
    "The need of a developer hub",
    "API Specifications",
    "Our ways of working",
];

const footerItemText = [
  "Hackney sites",
  "Accessibility",
  "Contact us",
];

function elementContainsTextArray(element, textArray) {
  element.each((item, index) => {
    expect(item.text()).to.eq(textArray[index]);
  });
}

describe("Home page integration test", () => {
  beforeEach(() => {
    cy.visit("/")
  });

  it("Navbar test", () => {
    const header = cy.get("#header");

    // find logo
    cy.get(".lbh-header__logo-fallback-image");

    // find title
    const headerTitle = header.get(".name");
    headerTitle.contains("DEVELOPER HUB");

    // find header items
    const headerItems = header.get(".nav-items").children();
    elementContainsTextArray(
      headerItems,
      headerItemText
    );
  });

  it("Sidebar test", () => {
    const sidebar = cy.get(".sidebar");
    sidebar.contains("CONTENTS");

    const sidebarLinks = sidebar.get(".sidebarLink");
    sidebarLinks.should("have.length", 4);

    elementContainsTextArray(
      sidebarLinks,
      sidebarItemText
    );
  });

  it("Footer test", () => {
    const footer = cy.get("#app-footer");

    elementContainsTextArray(
      footer.children(),
      footerItemText
    );
  });
})
