import { httpResultClientError } from "../http-result";
import { tRequest, IRoles } from "../types";

const { unauthorized } = httpResultClientError;

export function auth<T>(httpRequest: tRequest<T>, roles: IRoles) {
  const jwtPayload = httpRequest.headers["x-jwt-payload"];
  if (typeof jwtPayload !== "string") {
    return unauthorized({ error: "jwt is not defined" });
  }
  const jwt = JSON.parse(Buffer.from(jwtPayload, "base64").toString());
  // check if jwt is expired
  if (typeof jwt["exp"] !== "number") {
    return unauthorized({ error: "invalid jwt" });
  }
  if (jwt["exp"] < Date.now() / 1000) {
    return unauthorized({ error: "jwt expired" });
  }
  // check if jwt has id
  if (typeof jwt["sub"] !== "string") {
    return unauthorized({ error: "invalid jwt" });
  }
  const { admin, accountant, assistant, customer, provider, support } = roles;
  // if admin, can access all the routes
  if (admin && jwt["admin"]) {
    return { userId: jwt["sub"] };
  }
  if (provider && jwt["provider"]) {
    return { userId: jwt["sub"] };
  }
  if (customer && jwt["customer"]) {
    return { userId: jwt["sub"] };
  }
  if (assistant && jwt["assistant"]) {
    return { userId: jwt["sub"] };
  }
  if (accountant && jwt["accountant"]) {
    return { userId: jwt["sub"] };
  }
  if (support && jwt["support"]) {
    return { userId: jwt["sub"] };
  }
  return unauthorized({ error: "unauthorized" });
}
