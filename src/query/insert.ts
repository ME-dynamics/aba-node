import { andStr, separator } from "./constant";
import type { IInsertQuery, IDmlQuery } from "../types";

/**
 * produce query to insert rows into scylla db
 * @param args
 * @returns an insert query string
 */
export function insertQuery(args: IInsertQuery): IDmlQuery {
  const { table, version, values, lwt } = args;
  const tableName = `${table.toLowerCase()}_${version.toLowerCase()}`;
  const columns = [];
  const clmnValues = [];
  const ifClause = lwt ? `IF ${lwt.join(andStr)}` : "";
  for (let index = 0; index < values.length; index++) {
    // eslint-disable-next-line security/detect-object-injection
    const { column, staticValue, dynamicValue } = values[index];
    columns.push(column.toLowerCase());
    if (dynamicValue) {
      clmnValues.push(`:${column.toLowerCase()}`);
    } else if (typeof staticValue === "string") {
      clmnValues.push(`'${staticValue}'`);
    } else if (staticValue === null) {
      clmnValues.push("null");
    } else {
      clmnValues.push(staticValue);
    }
  }
  const query = `INSERT INTO ${tableName} (${columns.join(
    separator
  )}) VALUES (${clmnValues.join(separator)}) ${ifClause};`;
  const logColumns = ["dml", ...columns];
  const logColumnsValues = ["'create'", ...clmnValues];
  const logQuery = `INSERT INTO ${tableName}_log (${logColumns.join(
    separator
  )}) VALUES (${logColumnsValues.join(separator)});`;
  return {
    query,
    logQuery,
  };
}
