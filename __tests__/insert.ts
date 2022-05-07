import { insertQuery } from "../src/query/insert";

describe("insert query", () => {
  it("should return insert query", () => {
    const query = insertQuery({
      table: "user",
      version: "v1",
      values: [
        { column: "id", dynamicValue: true },
        { column: "name", dynamicValue: true },
        { column: "age", staticValue: 20 },
      ],
      lwt: ["name = 'erfan'"],
    });
    const expectedQuery = `INSERT INTO user_v1 (id, name, age) VALUES (:id, :name, 20) IF name = 'erfan';`;
    const expectedLogQuery = `INSERT INTO user_v1_log (dml, id, name, age) VALUES ('create', :id, :name, 20);`;
    expect(query.query.replace("\n", "")).toBe(expectedQuery);
    expect(query.logQuery.replace("\n", "")).toBe(expectedLogQuery);
  });
  it("should return insert query with ttl", () => {
    const query = insertQuery({
      table: "user",
      version: "v1",
      values: [
        { column: "id", dynamicValue: true },
        { column: "name", dynamicValue: true },
        { column: "age", staticValue: 20 },
      ],
      lwt: ["name = 'erfan'"],
      ttl: {
        hours: 1,
      }
    });
    const expectedQuery = `INSERT INTO user_v1 (id, name, age) VALUES (:id, :name, 20) IF name = 'erfan' USING TTL 3600;`;
    const expectedLogQuery = `INSERT INTO user_v1_log (dml, id, name, age) VALUES ('create', :id, :name, 20);`;
    expect(query.query.replace("\n", "")).toBe(expectedQuery);
    expect(query.logQuery.replace("\n", "")).toBe(expectedLogQuery);
  })
});
