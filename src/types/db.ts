import { Client, types } from "cassandra-driver";

export type tResultSet = types.ResultSet;
export type tRow = types.Row;
export type tLong = types.Long;

interface IErrorPath {
  errorPath: string | undefined;
}
export interface IScyllaClient extends IErrorPath {
  contactPoints: string[];
  localDataCenter: string;
  keyspace: string;
}
export interface IBuildDbFunc {
  client: Client;
  mode?: "delete" | "init" | "insert" | "update"
}

export interface ISelect extends IErrorPath {
  query: string;
  params: Record<string, any> | undefined;
  unique: true;
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
  | "SET"
  | "MAP"
  | "UDT";

export interface IDbColumn {
  name: string;
  type: tScyllaNativeTypes;
  setType?: tScyllaNativeTypes;
  udtName?: string;
  map?: {
    keyType: tScyllaNativeTypes;
    valueType: tScyllaNativeTypes;
  };
}

export interface ICreateIndex {
  name: string;
  version: string;
  table: string;
  indexKey: string;
  localIndex?: {
    partition_key: string;
  };
}
export interface ICreateType {
  name: string;
  version: string;
  columns: IDbColumn[];
}

export interface IPrimaryKey {
  partition: string[];
  cluster?: string[];
}

export interface ICreateTable {
  name: string;
  version: string;
  columns: IDbColumn[];
  primaryKey: IPrimaryKey;
  orderBy?: {
    key: string;
    type: "ASC" | "DESC";
  };
}

export interface IMaterialView {
  name: string;
  version: string;
  selectQuery: string;
  primaryKey: IPrimaryKey;
}
export interface IQuery {
  entityName: string;
  query: string;
}

export interface IValues {
  column: string;
  value?: string | number | boolean | null;
  self?: boolean;
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
}
export interface IDeleteQuery {
  table: string;
  version: string;
  columns: string[] | undefined;
  where: string[];
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
  self?: boolean;
  equals?: string | number | boolean;
}

export interface IGreaterThan {
  argument: string;
  equality: boolean;
  self?: boolean;
  greaterThan?: string | number | boolean;
}

export interface ILessThan {
  argument: string;
  equality: boolean;
  self?: boolean;
  lessThan?: string | number | boolean;
}

export interface INotEqual {
  argument: string;
  self?: boolean;
  notEqual: string | number | boolean;
}

export interface IIN {
  argument: string;
  self?: boolean;
  items?: string[];
}

// export interface IContains {
//   argument: string;

// }

// functions

export type tDbSelectFunc = (info: ISelect) => Promise<tResultSet>;
export type tDbUpsertFunc = (info: IQueryExec) => Promise<tResultSet>;
export type tDbInitFunc = (info: IInit) => Promise<tResultSet>;
