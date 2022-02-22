import { buildRouteGenerator } from "../src/http-client/routeGen";

describe("route generator", () => {
  it("should return correct path", () => {
    const routeGen = buildRouteGenerator({
      service: "business",
      version: "v1",
    });
    expect.assertions(1);
    expect(routeGen(["customers", ":customerId"])).toBe(
      "/api/v1/business/customers/:customerId"
    );
  });
  it("should throw error when using / in route", () => {
    const routeGen = buildRouteGenerator({
      service: "business",
      version: "v1",
    });
    expect.assertions(1);
    expect(() => routeGen(["customers", "/:customerId"])).toThrow();
  })
  it("should throw error when using space in route", () => {
    const routeGen = buildRouteGenerator({
      service: "business",
      version: "v1",
    });
    expect.assertions(1);
    expect(() => routeGen(["customers", " :customerId"])).toThrow();
  })
  it("should return base when routes is empty array", () => {
    const routeGen = buildRouteGenerator({
      service: "business",
      version: "v1",
    });
    expect.assertions(1);
    expect(routeGen([])).toBe("/api/v1/business");
  })
});
