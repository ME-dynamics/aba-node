import { IInsertQuery } from "../types";
import { andStr, separator } from "./constant";

/**
 * produce query to insert rows into scylla db
 * @param args
 * @returns an insert query string
 */
export function insertQuery(args: IInsertQuery) {
  const { table, version, values, lwt } = args;
  const tableName = `${table.toLowerCase()}_${version.toLowerCase()}`;
  const columns = [];
  const clmnValues = [];
  const ifClause = lwt ? `IF ${lwt.join(andStr)}` : "";
  for (let index = 0; index < values.length; index++) {
    // eslint-disable-next-line security/detect-object-injection
    const { column, value, self } = values[index];
    columns.push(column.toLowerCase());
    if (self) {
      clmnValues.push(`:${column.toLowerCase()}`);
    } else if (typeof value === "string") {
      clmnValues.push(`'${value}'`);
    } else if (value === null) {
      clmnValues.push("null");
    } else {
      clmnValues.push(value);
    }
  }
  return `INSERT INTO ${tableName} (${columns.join(
    separator
  )}) VALUES (${clmnValues.join(separator)}) ${ifClause};`;
}

