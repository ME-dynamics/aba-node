import { IOrderBy } from "../types";

export function stringifyOrderBy(orderBy?: IOrderBy[]): string {
  if (!orderBy) {
    return "";
  }
  const length = orderBy.length;
  if (length === 1) {
    const { key, type } = orderBy[0];
    return `${key} ${type}`;
  }
  const orderKeys = [];
  for (let index = 0; index < orderBy.length; index++) {
    const { key, type } = orderBy[index];
    orderKeys.push(`${key} ${type}`);
  }
  return orderKeys.join(", ");
}
