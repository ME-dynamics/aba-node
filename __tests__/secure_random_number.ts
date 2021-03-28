import { secureRandomNumber } from "../index";

describe("secure random number", () => {
  it("should generate between range", async () => {
    const min = [10, 1000, 10000000, 10000, 654654, 74654564];
    const max = [99, 9999, 99999999, 9999999, 846121, 975461321];
    if (min.length !== max.length){
        throw new Error("min and max length must be equal");
    }
    // two expect statements in for loop 
    expect.assertions(2 * min.length);
    for (let index = 0; index < min.length; index++) {
      const result = await secureRandomNumber({
        min: min[index],
        max: max[index],
      });
      expect(result).toBeLessThan(max[index]);
      expect(result).toBeGreaterThan(min[index]);
    }
  });
  it("should throw error if min is greater than max", async () => {
    expect.assertions(1);
    const min = 100000;
    const max = 99999;
    await expect(secureRandomNumber({ min, max })).rejects.toThrow();
  });
  it("should throw error when not integer", async () => {
    expect.assertions(1);
    const min = 12123.45454;
    const max = 1321321.454;
    await expect(secureRandomNumber({ min, max })).rejects.toThrow();
  });
});
