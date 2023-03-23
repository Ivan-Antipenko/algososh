import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import { baseUrl } from "../../src/constants/e2e";

describe("fibonacci page render correctly", () => {
  before(() => {
    cy.visit(`${baseUrl}/fibonacci`);
  });

  it("button disabled if input is empty", () => {
    cy.get("input").should("be.empty");
    cy.get("button").should("be.disabled");
  });

  it("fibonacci elements render correctly", () => {
    cy.visit(`${baseUrl}/fibonacci`);
    const num = 4;
    cy.get("input").type(num);
    cy.get("button").should("not.be.disabled");
    cy.get("button").contains("Рассчитать").click();
    cy.get("[class^=circle_content]").as("circles");
    cy.get("@circles").find("[class^=circle_circle]").eq(0).contains("1");
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("@circles").find("[class^=circle_circle]").eq(1).contains("1");
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("@circles").find("[class^=circle_circle]").eq(2).contains("2");
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("@circles").find("[class^=circle_circle]").eq(3).contains("3");
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("@circles").find("[class^=circle_circle]").eq(4).contains("5");
  });
});
