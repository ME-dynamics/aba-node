import { ICreateIndex } from "../types";

/**
 ** create index on a field that's outside primary key in scylla db, it checks if index exists
 * @param args an object containing index name, table name, index and table version (must be in sync)
 * index_key ( the key you want to index ), if needed add index locally instead of globally
 * @returns index query string
 */
export function createIndexQuery(args: ICreateIndex) {
  const { indexName, indexOnTable, version, indexKey, localIndex } = args;
  // database data should be in snake case
  const indexStr = `${indexName.toLowerCase()}_${version.toLowerCase()}`;
  const tableStr = `${indexOnTable.toLowerCase()}_${version.toLowerCase()}`;

  return `CREATE INDEX IF NOT EXISTS ${indexStr} ON ${tableStr} (${
    localIndex ? `(${localIndex.partitionKey}),` : ""
  }${indexKey.toLowerCase()});`;
}
