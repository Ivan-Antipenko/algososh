import { DELAY_IN_MS } from "../../src/constants/delays";

describe("String testing", () => {
  before(() => {
    cy.visit("http://localhost:3000/recursion");
  });

  it("Button is disabled if the input is empty", () => {
    cy.get("input").should("be.empty");
    cy.get("button").should("be.disabled");
  });

  it("reverse string correct", () => {
    const string = "123";
    cy.visit("http://localhost:3000/recursion");

    cy.get("input").type(string);
    cy.get("button").contains("Развернуть").click();
    cy.get("[class^=circle_content]").as("circles");
    cy.get("@circles").eq(0).find("[class^=circle_circle]").as("first");
    cy.get("@circles").eq(1).find("[class^=circle_circle]").as("second");
    cy.get("@circles").eq(2).find("[class^=circle_circle]").as("third");
    cy.get("@first")
      .should("have.css", "border-color", "rgb(210, 82, 225)")
      .contains("1");
    cy.get("@third")
      .should("have.css", "border-color", "rgb(210, 82, 225)")
      .contains("3");

    cy.wait(DELAY_IN_MS);

    cy.get("@first")
      .should("have.css", "border-color", "rgb(127, 224, 81)")
      .contains("3");
    cy.get("@second")
      .should("have.css", "border-color", "rgb(127, 224, 81)")
      .contains("2");
    cy.get("@third")
      .should("have.css", "border-color", "rgb(127, 224, 81)")
      .contains("1");
  });
});
