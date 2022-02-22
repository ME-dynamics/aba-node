import { createTableQuery } from "../src/query/createTableQuery";

describe("create table query", () => {
  it("should return table query with cluster", () => {
    const tableQuery = createTableQuery({
      name: "customers",
      version: "v1",
      columns: [
        { columnName: "id", columnType: "UUID" },
        { columnName: "name", columnType: "TEXT" },
        { columnName: "likes", columnType: "SET", setType: "TEXT" },
        {
          columnName: "comments",
          columnType: "MAP",
          mapType: { keyType: "TEXT", valueType: "TEXT" },
        },
        { columnName: "user", columnType: "UDT", udtName: "user" },
      ],
      primaryKey: {
        partition: ["id"],
        cluster: ["name"],
      },
      orderBy: [{ key: "name", type: "ASC" }],
    });
    const query = tableQuery.query.replace("\n", "");
    const expectedQuery = `CREATE TABLE IF NOT EXISTS customers_v1 (id uuid, name text, likes set<text>, comments map<text, text>, user user, PRIMARY KEY (id, name)) WITH CLUSTERING ORDER BY (name ASC);`;
    const expectedLogQuery = `CREATE TABLE IF NOT EXISTS customers_v1_log (id uuid, name text, likes set<text>, comments map<text, text>, user user, dml text, PRIMARY KEY (id, name, dml));`;
    expect(tableQuery.name).toBe("customers_v1");
    expect(query).toBe(expectedQuery);
    expect(tableQuery.logQuery.replace("\n", "")).toBe(expectedLogQuery);
  });
  it("should return table query with no cluster", () => {
    const tableQuery = createTableQuery({
      name: "customers",
      version: "v1",
      columns: [
        { columnName: "id", columnType: "UUID" },
        { columnName: "name", columnType: "TEXT" },
        { columnName: "likes", columnType: "SET", setType: "TEXT" },
        {
          columnName: "comments",
          columnType: "MAP",
          mapType: { keyType: "TEXT", valueType: "TEXT" },
        },
        { columnName: "user", columnType: "UDT", udtName: "user" },
      ],
      primaryKey: {
        partition: ["id"],
      },
    });
    const query = tableQuery.query.replace("\n", "");
    const expectedQuery = `CREATE TABLE IF NOT EXISTS customers_v1 (id uuid, name text, likes set<text>, comments map<text, text>, user user, PRIMARY KEY (id)) ;`;
    const expectedLogQuery = `CREATE TABLE IF NOT EXISTS customers_v1_log (id uuid, name text, likes set<text>, comments map<text, text>, user user, dml text, PRIMARY KEY (id, dml));`;
    expect(tableQuery.name).toBe("customers_v1");
    expect(query).toBe(expectedQuery);
    expect(tableQuery.logQuery.replace("\n", "")).toBe(expectedLogQuery);
  });
});
