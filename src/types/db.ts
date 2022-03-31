import { Client, types } from "cassandra-driver";

export type tResultSet = types.ResultSet;
export type tRow = types.Row;
export type tLong = types.Long;
interface IErrorPath {
  errorPath: string | undefined;
}
export interface IScyllaClient extends IErrorPath {
  id: string | undefined;
  applicationName: string | undefined;
  applicationVersion: string | undefined;
  contactPoints: string[];
  localDataCenter: string;
  keyspace: string;
}
export interface IBuildDbFunc {
  client: Client;
  mode?: "delete" | "init" | "insert" | "update";
}

export interface IConcurrentQuery {
  query: string;
  params: Record<string, any>[];
}
export interface IConcurrent extends IErrorPath {
  queries: IConcurrentQuery[];
}
export interface IConcurrentResult {
  resultItems: any[];
  totalExecuted: number;
  allExecuted: boolean;
}
export interface IQueryOptions {
  autoPage: boolean | undefined;
  fetchSize: number | undefined;
  pageState: string | Buffer | undefined;
  consistency: number | undefined;
  serialConsistency: number | undefined;
}
export interface ISelect extends IErrorPath {
  query: string;
  params: Record<string, any> | undefined;
  unique: boolean;
  queryOptions: IQueryOptions | undefined;
}

export interface IQueryExec extends IErrorPath {
  query: string;
  params: Record<string, any> | undefined;
}

export interface IInit extends IErrorPath {
  query: string;
}

export type tScyllaNativeTypes =
  | "ASCII"
  | "BIGINT"
  | "BLOB"
  | "BOOLEAN"
  | "COUNTER"
  | "DATE"
  | "DECIMAL"
  | "DOUBLE"
  | "DURATION"
  | "FLOAT"
  | "INET"
  | "INT"
  | "SMALLINT"
  | "TEXT"
  | "TIME"
  | "TIMESTAMP"
  | "TIMEUUID"
  | "TINYINT"
  | "UUID"
  | "VARCHAR"
  | "VARINT"
  | "LIST"
  | "SET"
  | "MAP"
  | "UDT";

export interface IDbColumn {
  columnName: string;
  columnType: tScyllaNativeTypes;
  setType?: tScyllaNativeTypes;
  listType?: tScyllaNativeTypes;
  udtName?: string;
  mapType?: {
    keyType: tScyllaNativeTypes;
    valueType: tScyllaNativeTypes;
    udtName?: string;
  };
}

export interface ICreateIndex {
  indexName: string;
  version: string;
  indexOnTable: string;
  indexKey: string;
  localIndex?: {
    partitionKey: string;
  };
}
export interface ICreateType {
  typeName: string;
  version: string;
  columns: IDbColumn[];
}

export interface IPrimaryKey {
  partition: string[];
  cluster?: string[];
}

export interface IOrderBy {
  key: string;
  type: "ASC" | "DESC";
}
export interface ICreateTable {
  name: string;
  version: string;
  columns: IDbColumn[];
  primaryKey: IPrimaryKey;
  orderBy?: IOrderBy[];
}

export interface IMaterialView {
  materialViewName: string;
  version: string;
  selectQuery: string;
  primaryKey: IPrimaryKey;
  orderBy?: IOrderBy[];
}
export interface ICreateTableQuery {
  name: string;
  query: string;
  logQuery: string;
}
export interface IQuery {
  name: string;
  query: string;
}
export interface IDmlQuery {
  query: string;
  logQuery: string;
}
export interface IValues {
  column: string;
  staticValue?: string | number | boolean | null;
  dynamicValue?: boolean;
}
export interface IInsertQuery {
  table: string;
  version: string;
  values: IValues[];
  lwt?: string[];
}
export interface IUpdateQuery {
  table: string;
  version: string;
  values: IValues[];
  where: string[];
  lwt?: string[];
  logIdLabel: string[];
}
export interface IDeleteQuery {
  table: string;
  version: string;
  columns: string[] | undefined;
  where: string[];
  logIdLabel: string[];
  lwt?: string[];
}
export interface ISelectQuery {
  table: string;
  version: string;
  distinct?: boolean;
  columns: string[];
  where: string[];
  orderBy?: {
    key: string;
    type: "ASC" | "DESC";
  };
  limit?: number;
  allowFiltering?: boolean;
}
export interface IEqual {
  argument: string;
  dynamicValue?: boolean;
  staticValue?: string | number | boolean;
}

export interface IGreaterThan {
  argument: string;
  equalAndGreater: boolean;
  dynamicValue?: boolean;
  staticValue?: string | number | boolean;
}

export interface ILessThan {
  argument: string;
  equalAndLess: boolean;
  dynamicValue?: boolean;
  staticValue?: string | number | boolean;
}

export interface INotEqual {
  argument: string;
  dynamicValue?: boolean;
  staticValue?: string | number | boolean;
}

export interface IIN {
  argument: string;
  dynamicValue?: boolean;
  tuple?: any[];
}

// export interface IContains {
//   argument: string;

// }

// functions

interface IBatchQueries {
  query: string;
  params: Record<string, any>;
}
export interface IBatch extends IErrorPath {
  queries: IBatchQueries[];
}

export type tDbSelectFunc = (info: ISelect) => Promise<tResultSet>;
export type tDbUpsertFunc = (info: IQueryExec) => Promise<tResultSet>;
export type tDbInitFunc = (info: IInit) => Promise<tResultSet>;
export type tDbBatchFunc = (info: IBatch) => Promise<tResultSet>;
export type tDbDeleteFunc = (info: IQueryExec) => Promise<tResultSet>;
