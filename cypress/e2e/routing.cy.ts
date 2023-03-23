import { baseUrl } from "../../src/constants/e2e";
describe("Routing works correctly", () => {
  before(() => {
    cy.visit(baseUrl);
  });

  it("string-page is worked", () => {
    cy.visit(`${baseUrl}/recursion`);
    cy.get("h3").contains("Строка");
  });

  it("fibonacci-page is worked", () => {
    cy.visit(`${baseUrl}/fibonacci`);
    cy.get("h3").contains("Последовательность Фибоначчи");
  });

  it("sorting-page is worked", () => {
    cy.visit(`${baseUrl}/sorting`);
    cy.get("h3").contains("Сортировка массива");
  });

  it("stack-page is worked", () => {
    cy.visit(`${baseUrl}/stack`);
    cy.get("h3").contains("Стек");
  });

  it("queue-page is worked", () => {
    cy.visit(`${baseUrl}/queue`);
    cy.get("h3").contains("Очередь");
  });

  it("list-page is worked", () => {
    cy.visit(`${baseUrl}/list`);
    cy.get("h3").contains("Связный список");
  });
});
