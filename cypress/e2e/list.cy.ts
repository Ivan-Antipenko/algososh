import { baseUrl } from "../../src/constants/e2e";
describe("queue testing", () => {
  before(() => {
    cy.visit(`${baseUrl}/list`);
  });

  it("buttons disabled if input is empty", () => {
    cy.get("input[placeholder='Введите текст']").should("be.empty");
    cy.get("input[placeholder='Введите индекс']").should("be.empty");
    cy.get(".addHead").should("be.disabled");
    cy.get(".addTail").should("be.disabled");
    cy.get(".addIndex").should("be.disabled");
    cy.get(".removeIndex").should("be.disabled");
  });

  it("default list render correctly", () => {
    cy.visit(`${baseUrl}/list`);
    cy.get("[class^=circle_content]").as("circles");
    cy.get("@circles").eq(0).find("[class^=circle_circle]").as("first");
    cy.get("@first")
      .should("have.css", "border-color", "rgb(0, 50, 255)")
      .contains("0");
    cy.get("@circles").eq(1).find("[class^=circle_circle]").as("second");
    cy.get("@second")
      .should("have.css", "border-color", "rgb(0, 50, 255)")
      .contains("34");
    cy.get("@circles").eq(2).find("[class^=circle_circle]").as("third");
    cy.get("@third")
      .should("have.css", "border-color", "rgb(0, 50, 255)")
      .contains("8");
    cy.get("@circles").eq(3).find("[class^=circle_circle]").as("fourth");
    cy.get("@fourth")
      .should("have.css", "border-color", "rgb(0, 50, 255)")
      .contains("1");
  });

  it("add in head", () => {
    cy.visit(`${baseUrl}/list`);
    cy.get("[class^=circle_content]").as("circles");
    cy.get("@circles").eq(0).find("[class^=circle_circle]").as("first");
    cy.get("input[placeholder='Введите текст']").type("123");
    cy.get(".addHead").click();
    cy.get("@first").contains("123");
    cy.get("@circles").eq(0).contains("head");
  });

  it("add in tail", () => {
    cy.visit(`${baseUrl}/list`);
    cy.get("[class^=circle_content]").as("circles");
    cy.get("@circles").last().find("[class^=circle_circle]").as("last");
    cy.get("input[placeholder='Введите текст']").type("123");
    cy.get(".addTail").click();
    cy.get("@last").contains("123");
    cy.get("@circles").last().contains("tail");
  });

  it("add by index", () => {
    const el = 777;
    const index = 2;
    cy.visit(`${baseUrl}/list`);
    cy.get("[class^=circle_content]").as("circles");
    cy.get("input[placeholder='Введите текст']").type(el);
    cy.get("input[placeholder='Введите индекс']").type(index);
    cy.get(".addIndex").click();
    cy.wait(2000);
    cy.get("@circles").eq(index).contains(el);
  });

  it("remove by index", () => {
    const index = 2;
    cy.visit(`${baseUrl}/list`);
    cy.get("[class^=circle_content]").as("circles");
    cy.get("input[placeholder='Введите индекс']").type(index);
    cy.get(".removeIndex").click();
    cy.wait(2000);
    cy.get("@circles").eq(index).contains("1");
  });

  it("remove from head", () => {
    cy.visit(`${baseUrl}/list`);
    cy.get("[class^=circle_content]").as("circles");
    cy.get(".removeHead").click();
    cy.get("@circles").first().contains("34");
  });

  it("remove from tail", () => {
    cy.visit(`${baseUrl}/list`);
    cy.get("[class^=circle_content]").as("circles");
    cy.get(".removeTail").click();
    cy.get("@circles").last().contains("8");
  });
});
