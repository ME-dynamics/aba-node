import { separator, andStr } from "./constant";
import { logIdStringify } from "./logIdStringify";
import type { IDeleteQuery, IDmlQuery } from "../types";

/**
 ** builds delete query for deleting rows
 * @param args an object containing table name, version, columns, and where clause
 * lwt clause, an array of string usually filled with operators for LWT in scylla db
 * @returns delete query string
 */
export function deleteQuery(args: IDeleteQuery): IDmlQuery {
  const { table, version, columns, where, logIdLabel, lwt } = args;
  const tableName = `${table.toLowerCase()}_${version.toLowerCase()}`;
  const deleteColumns = columns ? ` ${columns.join(separator)} ` : " ";
  const ifClause = lwt ? `IF ${lwt.join(andStr)}` : "";
  const query = `DELETE${deleteColumns.toLowerCase()}FROM ${tableName} WHERE ${where.join(
    andStr
  )} ${ifClause};`;
  const logId = logIdStringify(logIdLabel);
  const logQuery = `INSERT INTO ${tableName}_log (${logIdLabel.join(
    ", "
  )}, dml) VALUES (${logId}, 'remove');`;
  return {
    query,
    logQuery,
  };
}
