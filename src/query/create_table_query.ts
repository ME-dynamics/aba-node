import { columnStringify } from "./column_stringify";
import { primaryKeyStringify } from "./primary_key_stringify";
import { ICreateTable, IQuery } from "../types";

/**
 ** builds a create table query for scylla db, it checks if table exists
 * @param args an object containing table name, version, columns, and primary key
 * @returns an object containing table name, and query string
 */
export function createTableQuery(args: ICreateTable): IQuery {
  const { name, version, columns, primaryKey, orderBy } = args;
  const dbColumns = columnStringify(columns);
  const primaryKeys = primaryKeyStringify(primaryKey);
  const tableName = `${name.toLowerCase()}_${version.toLowerCase()}`;
  const tableQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (
    ${dbColumns},
    PRIMARY KEY ${primaryKeys}
) ${
    orderBy
      ? `WITH CLUSTERING ORDER BY ${orderBy.key} ${
          orderBy?.type
        }`
      : ""
  };`;
  return {
    entityName: tableName,
    query: tableQuery,
  };
}

