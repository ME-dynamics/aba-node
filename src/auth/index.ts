import { result } from "aba-utils";
import { httpResultClientError } from "../http-result";
import { tRequest, IRoles } from "../types";

const { unauthorized } = httpResultClientError;

export function auth<T>(httpRequest: tRequest<T>, roles: IRoles) {
  const jwtPayload = httpRequest.headers["x-jwt-payload"];
  if (typeof jwtPayload !== "string") {
    return result({
      success: false,
      error: "jwt is not defined",
      payload: unauthorized({ error: "jwt is not defined" }),
    });
  }
  const jwt = JSON.parse(Buffer.from(jwtPayload, "base64").toString());
  // check if jwt is expired
  if (typeof jwt["exp"] !== "number") {
    return result({
      success: false,
      error: "invalid jwt",
      payload: unauthorized({ error: "invalid jwt" }),
    });
  }
  if (jwt["exp"] < Date.now() / 1000) {
    return result({
      success: false,
      error: "jwt expired",
      payload: unauthorized({ error: "jwt expired" }),
    });
  }
  // check if jwt has id
  if (typeof jwt["sub"] !== "string") {
    return result({
      success: false,
      error: "invalid jwt",
      payload: unauthorized({ error: "invalid jwt" }),
    });
  }
  const { admin, accountant, assistant, customer, provider, support } = roles;
  // if admin, can access all the routes
  if (admin && jwt["admin"]) {
    return result({
      success: true,
      error: undefined,
      payload: { userId: jwt["sub"] },
    });
  }
  if (provider && jwt["provider"]) {
    return result({
      success: true,
      error: undefined,
      payload: { userId: jwt["sub"] },
    });
  }
  if (customer && jwt["customer"]) {
    return result({
      success: true,
      error: undefined,
      payload: { userId: jwt["sub"] },
    });
  }
  if (assistant && jwt["assistant"]) {
    return result({
      success: true,
      error: undefined,
      payload: { userId: jwt["sub"] },
    });
  }
  if (accountant && jwt["accountant"]) {
    return result({
      success: true,
      error: undefined,
      payload: { userId: jwt["sub"] },
    });
  }
  if (support && jwt["support"]) {
    return result({
      success: true,
      error: undefined,
      payload: { userId: jwt["sub"] },
    });
  }
  return result({
    success: false,
    error: "unauthorized",
    payload: unauthorized({ error: "unauthorized" }),
  });
}
