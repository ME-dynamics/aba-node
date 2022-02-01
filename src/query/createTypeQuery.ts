import { columnStringify } from "./columnStringify";
import { ICreateType, IQuery } from "../types";

/**
 ** creates UDT (user defined types) query, it checks if type exists
 * @param args an object containing UDT's name, version, and columns
 * @returns an object containing UDT name and query string
 */
export function createTypeQuery(args: ICreateType): IQuery {
  const { typeName, version, columns } = args;
  const dbColumns = columnStringify(columns);
  const typeStr = `${typeName.toLowerCase()}_${version.toLowerCase()}`;
  const typeQuery = `CREATE TYPE IF NOT EXISTS ${typeStr} (${dbColumns});`;
  return {
    name: typeStr,
    query: typeQuery,
  };
}
