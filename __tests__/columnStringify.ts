import { columnStringify } from "../src/query/columnStringify";

describe("scylla db column stringify", () => {
  it("should return id uuid", () => {
    const id = columnStringify([{ columnName: "id", columnType: "UUID" }]);
    expect(id).toBe("id uuid");
  });
  it("should return name text", () => {
    const name = columnStringify([{ columnName: "name", columnType: "TEXT" }]);
    expect(name).toBe("name text");
  });
  it("should return images set<text>", () => {
    const images = columnStringify([
      { columnName: "images", columnType: "SET", setType: "TEXT" },
    ]);
    expect(images).toBe("images set<text>");
  });
  it("should return liked map<text, text>", () => {
    const liked = columnStringify([
      {
        columnName: "liked",
        columnType: "MAP",
        mapType: { keyType: "TEXT", valueType: "TEXT" },
      },
    ]);
    expect(liked).toBe("liked map<text, text>");
  });
  it("should return provider provider", () => {
    const provider = columnStringify([
      { columnName: "provider", columnType: "UDT", udtName: "provider" },
    ]);
    expect(provider).toBe("provider provider");
  });
  it("should return comments set<frozen<comment>>", () => {
    const comments = columnStringify([
      {
        columnName: "comments",
        columnType: "SET",
        setType: "UDT",
        udtName: "comment",
      },
    ]);
    expect(comments).toBe("comments set<frozen<comment>>");
  });
  it("should return messages map<text, frozen<message>>", () => {
    const messages = columnStringify([
      {
        columnName: "messages",
        columnType: "MAP",
        mapType: { keyType: "TEXT", valueType: "UDT", udtName: "message" },
      },
    ]);
    expect(messages).toBe("messages map<text, frozen<message>>");
  });
  it("should return db columns", () => {
    const columns = columnStringify([
      {
        columnName: "id",
        columnType: "UUID",
      },
      {
        columnName: "name",
        columnType: "ASCII",
      },
      {
        columnName: "last_name",
        columnType: "BLOB",
      },
    ]);
    expect(columns).toBe("id uuid, name ascii, last_name blob");
  });
  it("should throw udt name error", () => {
    expect(() =>
      columnStringify([{ columnName: "id", columnType: "UDT" }])
    ).toThrow("udt name must be defined when type is set to UDT");
  });
  it("should throw setType must be defined error", () => {
    expect(() =>
      columnStringify([{ columnName: "id", columnType: "SET" }])
    ).toThrow("setType must be defined when type is set to SET");
  });
  it("should throw setType cannot be set or map error", () => {
    expect(() =>
      columnStringify([{ columnName: "id", columnType: "SET", setType: "SET" }])
    ).toThrow("you cannot use set or map inside set");
    expect(() =>
      columnStringify([{ columnName: "id", columnType: "SET", setType: "MAP" }])
    ).toThrow("you cannot use set or map inside set");
  });
  it("should throw setType udt name must be defined error", () => {
    expect(() =>
      columnStringify([{ columnName: "id", columnType: "SET", setType: "UDT" }])
    ).toThrow("udt name must be defined when type is set to UDT");
  });
  // list
  it("should throw listType must be defined error", () => {
    expect(() =>
      columnStringify([{ columnName: "id", columnType: "LIST" }])
    ).toThrow("listType must be defined when type is set to LIST");
  });
  it("should throw listType cannot be set or map error", () => {
    expect(() =>
      columnStringify([
        { columnName: "id", columnType: "LIST", listType: "SET" },
      ])
    ).toThrow("you cannot use set, map, or list inside list");
    expect(() =>
      columnStringify([
        { columnName: "id", columnType: "LIST", listType: "MAP" },
      ])
    ).toThrow("you cannot use set, map, or list inside list");
    expect(() =>
      columnStringify([
        { columnName: "id", columnType: "LIST", listType: "LIST" },
      ])
    ).toThrow("you cannot use set, map, or list inside list");
  });
  it("should throw listType udt name must be defined error", () => {
    expect(() =>
      columnStringify([
        { columnName: "id", columnType: "LIST", listType: "UDT" },
      ])
    ).toThrow("udt name must be defined when type is set to UDT");
  });
  // list end
  it("should throw map key value error", () => {
    expect(() =>
      columnStringify([{ columnName: "id", columnType: "MAP" }])
    ).toThrow("map key and value type must be defined when type is set to MAP");
  });
  it("should throw set or map as key or value error", () => {
    expect(() =>
      columnStringify([
        {
          columnName: "id",
          columnType: "MAP",
          mapType: { keyType: "SET", valueType: "TEXT" },
        },
      ])
    ).toThrow("you cannot use set or map as key type or value type in a map");
    expect(() =>
      columnStringify([
        {
          columnName: "id",
          columnType: "MAP",
          mapType: { keyType: "BOOLEAN", valueType: "MAP" },
        },
      ])
    ).toThrow("you cannot use set or map as key type or value type in a map");
  });
  it("should throw map udt name undefined error", () => {
    expect(() =>
      columnStringify([
        {
          columnName: "id",
          columnType: "MAP",
          mapType: { keyType: "TEXT", valueType: "UDT" },
        },
      ])
    ).toThrow("udt name must be defined when type is set to UDT");
  });
  it("should throw reserved word error", () => {
    expect.assertions(3);
    expect(() =>
      columnStringify([{ columnName: "token", columnType: "UUID" }])
    ).toThrow("token is a reserved word and cannot be used as a column name");
    expect(() =>
      columnStringify([{ columnName: "COLUMNFAMILY", columnType: "UUID" }])
    ).toThrow(
      "COLUMNFAMILY is a reserved word and cannot be used as a column name"
    );
    expect(() =>
      columnStringify([{ columnName: "NORECURSIVE", columnType: "UUID" }])
    ).toThrow(
      "NORECURSIVE is a reserved word and cannot be used as a column name"
    );
  });
});
