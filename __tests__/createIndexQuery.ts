import { createIndexQuery } from "../src/query/createIndexQuery";

describe("create index query", () => {
  it("should return local index query", () => {
    const indexQuery = createIndexQuery({
      indexName: "customer_index",
      indexKey: "customer_name",
      indexOnTable: "customers",
      version: "v1",
      localIndex: {
        partitionKey: "customer_id",
      },
    });
    expect(indexQuery).toBe(
      "CREATE INDEX IF NOT EXISTS customer_index_v1 ON customers_v1 ((customer_id),customer_name);"
    );
  });
  it("should return index query", () => {
    const indexQuery = createIndexQuery({
      indexName: "customer_index",
      indexKey: "customer_name",
      indexOnTable: "customers",
      version: "v1",
    });
    expect(indexQuery).toBe(
      "CREATE INDEX IF NOT EXISTS customer_index_v1 ON customers_v1 (customer_name);"
    );
  });
});
