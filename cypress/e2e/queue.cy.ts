import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

describe("queue testing", () => {
  before(() => {
    cy.visit("http://localhost:3000/queue");
  });

  it("button disabled if input is empty", () => {
    cy.get("input").should("be.empty");
    cy.get(".addButton").should("be.disabled");
    cy.get(".removeButton").should("be.disabled");
  });

  it("add element in queue and head/tail correctly", () => {
    const el = 777;
    const el2 = 666;
    const el3 = 999;
    cy.visit("http://localhost:3000/queue");
    cy.get("input").type(el);
    cy.get(".addButton").click();
    cy.get("[class^=circle_content]").as("circles");
    cy.get("@circles").eq(0).find("[class^=circle_circle]").as("first");
    cy.get("@first")
      .should("have.css", "border-color", "rgb(210, 82, 225)")
      .contains(el);

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("@first").should("have.css", "border-color", "rgb(0, 50, 255)");
    cy.get("@circles").eq(0).contains("head");
    cy.get("@circles").eq(0).contains("tail");

    cy.get("input").type(el2);
    cy.get(".addButton").click();
    cy.get("@circles").eq(1).find("[class^=circle_circle]").as("second");
    cy.get("@second")
      .should("have.css", "border-color", "rgb(210, 82, 225)")
      .contains(el2);

    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("@second").should("have.css", "border-color", "rgb(0, 50, 255)");
    cy.get("@circles").eq(0).contains("head");
    cy.get("@circles").eq(1).contains("tail");

    cy.get("input").type(el3);
    cy.get(".addButton").click();
    cy.get("@circles").eq(2).find("[class^=circle_circle]").as("third");
    cy.get("@third")
      .should("have.css", "border-color", "rgb(210, 82, 225)")
      .contains(el3);

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("@third").should("have.css", "border-color", "rgb(0, 50, 255)");
    cy.get("@circles").eq(0).contains("head");
    cy.get("@circles").eq(2).contains("tail");
  });

  it("remove elements in queue correctly", () => {
    cy.visit("http://localhost:3000/queue");
    const el = 777;
    const el2 = 666;
    cy.get("input").type(el);
    cy.get(".addButton").click();
    cy.get("[class^=circle_content]").as("circles");
    cy.get("@circles").eq(0).find("[class^=circle_circle]").as("first");
    cy.get("@first").contains(el);
    cy.get("@circles").eq(0).contains("head");
    cy.get("@circles").eq(0).contains("tail");
    cy.get(".removeButton").click();
    cy.get("@first").should("have.css", "border-color", "rgb(210, 82, 225)");

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("@first").should("have.css", "border-color", "rgb(0, 50, 255)");
    cy.get("@first").should("have.value", "");
  });

  it("clear all elements", () => {
    cy.visit("http://localhost:3000/queue");
    const el = 777;
    const el2 = 666;
    cy.get("input").type(el);
    cy.get(".addButton").click();
    cy.get("[class^=circle_content]").as("circles");
    cy.get("@circles").eq(0).find("[class^=circle_circle]").as("first");
    cy.get("@first").contains(el);
    cy.get("@circles").eq(0).contains("head");
    cy.get("@circles").eq(0).contains("tail");
    cy.get("input").type(el2);
    cy.get(".addButton").click();
    cy.get("@circles").eq(1).find("[class^=circle_circle]").as("second");
    cy.get("@second").contains(el2);
    cy.get("@circles").eq(1).contains("tail");
    cy.get(".clearButton").click();

    cy.get("@circles").each((el) => {
      expect(el.find("[class^=circle_circle]").text()).equal("");
    });
  });
});
