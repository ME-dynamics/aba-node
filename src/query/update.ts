import { separator, andStr } from "./constant";
import { logIdStringify } from "./logIdStringify";
import { timeToSeconds } from "./timeToSeconds";
import type { IUpdateQuery, IDmlQuery } from "../types";

function updateLogQuery(args: IUpdateQuery): string {
  const { table, version, values, logIdLabel } = args;
  const tableName = `${table.toLowerCase()}_${version.toLowerCase()}`;
  const columns: string[] = ["dml"];
  const columnsValues: string[] = ["'update'"];
  for (let index = 0; index < values.length; index++) {
    const { column, dynamicValue, staticValue } = values[index];
    columns.push(column);
    if (dynamicValue) {
      columnsValues.push(`:${column.toLowerCase()}`);
    } else if (typeof staticValue === "string") {
      columnsValues.push(`'${staticValue}'`);
    } else if (staticValue === null) {
      columnsValues.push(`null`);
    } else {
      columnsValues.push(`${staticValue}`);
    }
  }
  const logId = logIdStringify(logIdLabel);
  return `INSERT INTO ${tableName}_log (${logIdLabel.join(
    ", "
  )}, ${columns.join(separator)}) VALUES (${logId}, ${columnsValues.join(
    separator
  )});`;
}

/**
 * produce query to update row in scylla db
 * @param args
 * @returns a query string
 */
export function updateQuery(args: IUpdateQuery): IDmlQuery {
  const { table, version, values, where, lwt, ttl } = args;
  const tableName = `${table.toLowerCase()}_${version.toLowerCase()}`;
  const updateInfo = [];
  const ifClause = lwt ? `IF ${lwt.join(andStr)}` : "";
  for (let index = 0; index < values.length; index++) {
    // eslint-disable-next-line security/detect-object-injection
    const { column, staticValue, dynamicValue } = values[index];

    if (dynamicValue) {
      updateInfo.push(`${column.toLowerCase()} = :${column.toLowerCase()}`);
    } else if (typeof staticValue === "string") {
      updateInfo.push(`${column.toLowerCase()} = '${staticValue}'`);
    } else if (staticValue === null) {
      updateInfo.push(`${column.toLowerCase()} = null`);
    } else {
      updateInfo.push(`${column.toLowerCase()} = ${staticValue}`);
    }
  }
  const usingTTL = ttl ? ` USING TTL ${timeToSeconds(ttl)}` : "";
  const query = `UPDATE ${tableName}${usingTTL} SET ${updateInfo.join(
    separator
  )} WHERE ${where.join(andStr)} ${ifClause};`;
  const logQuery = updateLogQuery(args);
  return {
    query,
    logQuery,
  };
}
