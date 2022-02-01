import schema from "fluent-json-schema";

export const fluentSchema = schema;
export const errorSchema = schema
  .object()
  .prop("error", schema.string().required().minLength(1).maxLength(577));

export const errorSchemaObject = {
  "4xx": errorSchema,
  "5xx": errorSchema,
};
