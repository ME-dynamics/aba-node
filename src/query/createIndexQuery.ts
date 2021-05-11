import { ICreateIndex } from "../types";

/**
 ** create index on a field that's outside primary key in scylla db, it checks if index exists
 * @param args an object containing index name, table name, index and table version (must be in sync)
 * index_key ( the key you want to index ), if needed add index locally instead of globally
 * @returns index query string 
 */
export function createIndexQuery(args: ICreateIndex) {
  const { name, table, version, indexKey, localIndex } = args;
  // database data should be in snake case
  const indexName = `${name.toLowerCase()}_${version.toLowerCase()}`;
  const tableName = `${table.toLowerCase()}_${version.toLowerCase()}`;

  return `CREATE INDEX IF NOT EXISTS ${indexName} ON ${tableName} (${
    localIndex ? `(${localIndex.partition_key}),` : ""
  }${indexKey.toLowerCase()});`;
}
