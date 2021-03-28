import { primaryKeyStringify } from "./primary_key_stringify";
import { IMaterialView, IQuery } from "../types";

/**
 ** builds a materialized view query for scylla db, it checks if view exists
 * @param args an object containing view name, version, select query, and primary key
 * @returns an object containing view name, and query string
 */
export function createMaterialView(args: IMaterialView): IQuery {
  const { name, version, selectQuery, primaryKey } = args;
  const primaryKeys = primaryKeyStringify(primaryKey);
  // database should be in snake case
  const viewName = `${name.toLowerCase()}_${version.toLowerCase()}`;
  const viewQuey = `CREATE MATERIALIZED VIEW IF NOT EXISTS ${viewName} AS ${selectQuery}
  PRIMARY KEY ${primaryKeys}`;

  return {
    entityName: viewName,
    query: viewQuey,
  };
}
