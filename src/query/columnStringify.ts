import { IDbColumn } from "../types";

/**
 * stringify an array of db columns
 * @param columns an array of i_db_column
 * @returns a string of db columns with their types, like - id uuid, name text. separated by ' , ' for a valid syntax (cql, scylla db)
 */
export function columnStringify(columns: IDbColumn[]): string {
  const columnString: string[] = [];
  for (let index = 0; index < columns.length; index++) {
    const { columnName, columnType, setType, udtName, mapType } =
      columns[index];
    /**
     * if column type is UDT (user defined types)
     * udtName variable should be defined
     */
    if (columnType === "UDT") {
      if (!udtName) {
        throw new Error("udt name must be defined when type is set to UDT");
      }
      // push db column with udt as type
      columnString.push(`${columnName.toLowerCase()} ${udtName.toLowerCase()}`);
      continue;
    }
    /**
     * if type is a set, setType must be defined
     * set is a sorted list with a type : set<type>
     * also if setType is UDT, udtName should be de defined
     * and db column type in set must be frozen : set<frozen<UDT>>
     */
    if (columnType === "SET") {
      if (!setType) {
        throw new Error("setType must be defined when type is set to SET");
      }
      if (setType === "SET" || setType === "MAP") {
        throw new Error("you cannot use set or map inside set");
      }
      if (setType === "UDT") {
        if (!udtName) {
          throw new Error("udt name must be defined when type is set to UDT");
        }
        columnString.push(
          `${columnName.toLowerCase()} set<frozen<${udtName.toLowerCase()}>>`
        );
      } else {
        columnString.push(
          `${columnName.toLowerCase()} set<${setType.toLowerCase()}>`
        );
      }
      continue;
    }
    /**
     * if type is map, keyType nad valueType must be defined
     * map is a key value structure and both key and value must be typed
     * if value type is a udt, udtName must be defined and it must be pushed
     * frozen
     */
    if (columnType === "MAP") {
      if (!mapType || !mapType.keyType || !mapType.valueType) {
        throw new Error(
          "map key and value type must be defined when type is set to MAP"
        );
      }
      const { keyType, valueType, udtName: mapUdtName } = mapType;
      if (
        valueType === "SET" ||
        valueType === "MAP" ||
        keyType === "SET" ||
        keyType === "MAP"
        // FIXME: probably you can't add udt as keyType, needs some test
      ) {
        throw new Error(
          "you cannot use set or map as key type or value type in a map"
        );
      }
      if (valueType === "UDT") {
        if (!mapUdtName) {
          throw new Error("udt name must be defined when type is set to UDT");
        }

        columnString.push(
          `${columnName.toLowerCase()} map<${keyType.toLowerCase()}, frozen<${mapUdtName.toLowerCase()}>>`
        );
      } else {
        columnString.push(
          `${columnName.toLowerCase()} map<${keyType.toLowerCase()}, ${valueType.toLowerCase()}>`
        );
      }
      continue;
    }
    // simple types
    columnString.push(
      `${columnName.toLowerCase()} ${columnType.toLowerCase()}`
    );
  }
  return columnString.join(", ");
}
