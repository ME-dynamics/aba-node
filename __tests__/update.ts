import { updateQuery } from "../src/query/update";

describe("update query", () => {
  it("should return update query", () => {
    const query = updateQuery({
      table: "user",
      version: "v1",
      values: [
        { column: "name", dynamicValue: true },
        { column: "age", staticValue: 20 },
      ],
      where: ["id = 1"],
      lwt: ["gender = 'male'"],
      logIdLabel: ["id"],
    });
    const expectedQuery = `UPDATE user_v1 SET name = :name, age = 20 WHERE id = 1 IF gender = 'male';`;
    const expectedLogQuery = `INSERT INTO user_v1_log (id, dml, name, age) VALUES (:id, 'update', :name, 20);`;
    expect(query.query.replace("\n", "")).toBe(expectedQuery);
    expect(query.logQuery.replace("\n", "")).toBe(expectedLogQuery);
  });
  it("should return update query with multiple log ids", () => {
    const query = updateQuery({
      table: "user",
      version: "v1",
      values: [
        { column: "name", dynamicValue: true },
        { column: "age", staticValue: 20 },
      ],
      where: ["id = 1"],
      lwt: ["gender = 'male'"],
      logIdLabel: ["id", "name_id", "user_hash"],
    });
    const expectedQuery = `UPDATE user_v1 SET name = :name, age = 20 WHERE id = 1 IF gender = 'male';`;
    const expectedLogQuery = `INSERT INTO user_v1_log (id, name_id, user_hash, dml, name, age) VALUES (:id, :name_id, :user_hash, 'update', :name, 20);`;
    expect(query.query.replace("\n", "")).toBe(expectedQuery);
    expect(query.logQuery.replace("\n", "")).toBe(expectedLogQuery);
  });
  it("should return query with ttl", () => {
    const query = updateQuery({
      table: "user",
      version: "v1",
      values: [
        { column: "name", dynamicValue: true },
        { column: "age", staticValue: 20 },
      ],
      where: ["id = 1"],
      lwt: ["gender = 'male'"],
      ttl: {
        hours: 1
      },
      logIdLabel: ["id"],
    });
    const expectedQuery = `UPDATE user_v1 USING TTL 3600 SET name = :name, age = 20 WHERE id = 1 IF gender = 'male';`;
    const expectedLogQuery = `INSERT INTO user_v1_log (id, dml, name, age) VALUES (:id, 'update', :name, 20);`;
    expect(query.query.replace("\n", "")).toBe(expectedQuery);
    expect(query.logQuery.replace("\n", "")).toBe(expectedLogQuery);
  })
});
