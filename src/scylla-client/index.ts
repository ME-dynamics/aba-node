import { Client } from "cassandra-driver";
import { buildInit } from "./init";
import { buildSelect } from "./select";
import { buildExecute } from "./execute";
import { IScyllaClient } from "../types";
import { ErrorFactory } from "aba-utils";

/**
 ** create a scylla db client then builds CRUD methods
 * @param info an object containing database info needed to connect
 * @returns an object containing init, select, upsert, delete methods
 */
export function scyllaClient(info: IScyllaClient) {
  const { contactPoints, keyspace, localDataCenter, errorPath } = info;
  try {
    const client = new Client({
      contactPoints: contactPoints,
      localDataCenter: localDataCenter,
      keyspace,
    });
    return {
      init: buildInit({ client }),
      select: buildSelect({ client }),
      insert: buildExecute({ client, mode: "insert" }),
      update: buildExecute({ client, mode: "update" }),
      delete: buildExecute({ client, mode: "delete" }),
    };
  } catch (error) {
    throw new ErrorFactory({
      name: "scylla_client_failed",
      message: "Error in creating scylla db client",
      detail: "",
      nativeError: error,
      path: errorPath,
    });
  }
}
