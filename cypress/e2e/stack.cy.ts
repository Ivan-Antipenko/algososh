import { DELAY_IN_MS } from "../../src/constants/delays";
import { baseUrl } from "../../src/constants/e2e";
describe("stack page display correctly", () => {
  before(() => {
    cy.visit(`${baseUrl}/stack`);
  });

  it("buttons disabled if input is empty", () => {
    cy.get("input").should("be.empty");
    cy.get(".addButton").should("be.disabled");
    cy.get(".removeButton").should("be.disabled");
  });

  it("stack add elements correctly", () => {
    const el = 777;
    cy.visit(`${baseUrl}/stack`);
    cy.get("input").type(el);
    cy.get(".addButton").click();
    cy.get("[class^=circle_content]").as("circles");
    cy.get("@circles").eq(0).find("[class^=circle_circle]").as("first");
    cy.get("@first")
      .should("have.css", "border-color", "rgb(210, 82, 225)")
      .contains(el);

    cy.wait(DELAY_IN_MS);

    cy.get("@first").should("have.css", "border-color", "rgb(0, 50, 255)");
  });

  it("stack remove elements correctly", () => {
    const el = 777;
    const el2 = 999;
    cy.visit(`${baseUrl}/stack`);
    cy.get("input").type(el);
    cy.get(".addButton").click();
    cy.get("[class^=circle_content]").as("circles");
    cy.get("@circles").eq(0).find("[class^=circle_circle]").as("first");
    cy.get("@first")
      .should("have.css", "border-color", "rgb(210, 82, 225)")
      .contains(el);

    cy.wait(DELAY_IN_MS);

    cy.get("@first").should("have.css", "border-color", "rgb(0, 50, 255)");
    cy.get("input").type(el2);
    cy.get(".addButton").click();
    cy.get("@circles").eq(1).find("[class^=circle_circle]").as("second");
    cy.get("@second")
      .should("have.css", "border-color", "rgb(210, 82, 225)")
      .contains(el2);

    cy.wait(DELAY_IN_MS);
    cy.get("@second").should("have.css", "border-color", "rgb(0, 50, 255)");
    cy.get(".removeButton").click();
    cy.get("@second").should("have.css", "border-color", "rgb(210, 82, 225)");
    cy.get("@circles").find("[class^=circle_circle]").last().contains(777);
  });

  it("remove all elements", () => {
    cy.visit(`${baseUrl}/stack`);
    const el = 777;
    const el2 = 999;
    cy.get("input").type(el);
    cy.get(".addButton").click();
    cy.get("[class^=circle_content]").as("circles");
    cy.get("@circles").eq(0).find("[class^=circle_circle]").as("first");
    cy.get("@first")
      .should("have.css", "border-color", "rgb(210, 82, 225)")
      .contains(el);

    cy.wait(DELAY_IN_MS);

    cy.get("@first").should("have.css", "border-color", "rgb(0, 50, 255)");

    cy.get("input").type(el2);
    cy.get(".addButton").click();
    cy.get("@circles").eq(1).find("[class^=circle_circle]").as("second");
    cy.get("@second")
      .should("have.css", "border-color", "rgb(210, 82, 225)")
      .contains(el2);

    cy.wait(DELAY_IN_MS);

    cy.get("@second").should("have.css", "border-color", "rgb(0, 50, 255)");

    cy.get("button").contains("Очистить").should("not.be.disabled").click();

    cy.get("[class^=circle_content]").should("not.exist");
  });
});
