import { baseUrl } from "../../src/constants/e2e";
describe("service is available", () => {
  it("should be available on localhost:3000", () => {
    cy.visit(baseUrl);
  });
});
