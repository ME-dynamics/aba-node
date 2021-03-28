import { columnStringify } from "./column_stringify";
import { ICreateType, IQuery } from "../types";


/**
 ** creates UDT (user defined types) query, it checks if type exists
 * @param args an object containing UDT's name, version, and columns
 * @returns an object containing UDT name and query string 
 */
export function createTypeQuery(args: ICreateType): IQuery {
  const { name, version, columns } = args;
  const dbColumns = columnStringify(columns);
  const typeName = `${name.toLowerCase()}_${version.toLowerCase()}`;
  const type_query = `CREATE TYPE IF NOT EXISTS ${typeName} (
    ${dbColumns}
);`;
  return {
    entityName: typeName,
    query: type_query,
  };
}
