import { columnStringify } from "./columnStringify";
import { primaryKeyStringify } from "./primaryKeyStringify";
import { stringifyOrderBy } from "./stringifyOrderBy";
import { ICreateTable, ICreateTableQuery, IPrimaryKey } from "../types";

function createLogTableQuery(args: ICreateTable): string {
  const { name, version, columns, primaryKey, orderBy } = args;
  const logDbColumns = columnStringify(
    columns.concat({ columnName: "dml", columnType: "TEXT" })
  );
  const { partition } = primaryKey;
  const logPrimaryKeys: IPrimaryKey = {
    partition: partition,
    cluster: ["dml"],
  };
  const primaryKeys = primaryKeyStringify(logPrimaryKeys);

  const tableName = `${name.toLowerCase()}_${version.toLowerCase()}`;

  const logTableQuery = `CREATE TABLE IF NOT EXISTS ${tableName}_log (${logDbColumns}, PRIMARY KEY ${primaryKeys});`;
  return logTableQuery;
}

/**
 ** builds a create table query for scylla db, it checks if table exists
 * @param args an object containing table name, version, columns, and primary key
 * @returns an object containing table name, and query string
 */
export function createTableQuery(args: ICreateTable): ICreateTableQuery {
  const { name, version, columns, primaryKey, orderBy } = args;
  const dbColumns = columnStringify(columns);

  const primaryKeys = primaryKeyStringify(primaryKey);
  const tableName = `${name.toLowerCase()}_${version.toLowerCase()}`;
  const tableQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (${dbColumns}, PRIMARY KEY ${primaryKeys}
) ${orderBy ? `WITH CLUSTERING ORDER BY (${stringifyOrderBy(orderBy)})` : ""};`;

  return {
    name: tableName,
    query: tableQuery,
    logQuery: createLogTableQuery(args),
  };
}
