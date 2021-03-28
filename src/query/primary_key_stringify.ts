import { IPrimaryKey } from "../types";

/**
 ** turn partition key and clustering key into valid
 ** scylla db cql format
 * @param keys an object containing partition and clustering keys
 */
export function primaryKeyStringify(keys: IPrimaryKey) {
  const { partition, cluster } = keys;
  /**
   * check if keys contain ',' character, it's not allowed
   * because it is used as separator for keys
   * NOTE: using join with space so search method works for all
   * of the keys provided
   */
  if (
    partition.join(" ").search(",") !== -1 ||
    (cluster && cluster.join(" ").search(",") !== -1)
  ) {
    throw new Error("not allowed to use ',' in your keys");
  }
  let partitionKey: string;
  if (partition.length === 0) {
    throw new Error("you must define at least one partition key");
  } else if (partition.length === 1) {
    partitionKey = `${partition[0]}`;
  } else {
    partitionKey = `(${partition.join(", ")})`;
  }
  if (!cluster) {
    return `(${partitionKey})`;
  }
  if (cluster && cluster.length === 1) {
    return `(${partitionKey}, ${cluster[0]})`;
  } else {
    return `(${partitionKey}, ${cluster ? cluster.join(", ") : ""})`;
  }
}
