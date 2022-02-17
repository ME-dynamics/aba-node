import { deleteQuery } from "../src/query/delete";

describe("delete query", () => {
  it("should return delete query", () => {
    const query = deleteQuery({
      table: "user",
      version: "v1",
      columns: undefined,
      where: ["id = 1"],
      lwt: ["name = 'erfan'"],
      logIdLabel: ["id"],
    });
    expect(query.query.replace("\n", "")).toBe(
      `DELETE FROM user_v1 WHERE id = 1 IF name = 'erfan';`
    );
    expect(query.logQuery.replace("\n", "")).toBe(
      `INSERT INTO user_v1_log (id, dml) VALUES (:id, 'remove');`
    );
  });
  it("should return delete query with columns", () => {
    const query = deleteQuery({
      table: "user",
      version: "v1",
      columns: ["last_name", "age"],
      where: ["id = 1"],
      logIdLabel: ["id"],
      lwt: ["name = 'erfan'"],
    });
    expect(query.query.replace("\n", "")).toBe(
      `DELETE last_name, age FROM user_v1 WHERE id = 1 IF name = 'erfan';`
    );
    expect(query.logQuery.replace("\n", "")).toBe(
      `INSERT INTO user_v1_log (id, dml) VALUES (:id, 'remove');`
    );
  });
  it("should return delete query with multiple log id", () => {
    const query = deleteQuery({
      table: "user",
      version: "v1",
      columns: undefined,
      where: ["id = 1"],
      lwt: ["name = 'erfan'"],
      logIdLabel: ["id", "name_id", "user_hash"],
    });
    expect(query.query.replace("\n", "")).toBe(
      `DELETE FROM user_v1 WHERE id = 1 IF name = 'erfan';`
    );
    expect(query.logQuery.replace("\n", "")).toBe(
      `INSERT INTO user_v1_log (id, name_id, user_hash, dml) VALUES (:id, :name_id, :user_hash, 'remove');`
    );
  });
});
