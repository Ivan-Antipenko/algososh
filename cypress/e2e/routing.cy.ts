describe("Routing works correctly", () => {
  before(() => {
    cy.visit("http://localhost:3000");
  });

  it("string-page is worked", () => {
    cy.visit(`${"http://localhost:3000"}/recursion`);
  });

  it("fibonacci-page is worked", () => {
    cy.visit(`${"http://localhost:3000"}/fibonacci`);
  });

  it("sorting-page is worked", () => {
    cy.visit(`${"http://localhost:3000"}/sorting`);
  });

  it("stack-page is worked", () => {
    cy.visit(`${"http://localhost:3000"}/stack`);
  });

  it("queue-page is worked", () => {
    cy.visit(`${"http://localhost:3000"}/queue`);
  });

  it("list-page is worked", () => {
    cy.visit(`${"http://localhost:3000"}/list`);
  });
});
