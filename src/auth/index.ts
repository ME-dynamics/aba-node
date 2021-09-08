import { httpResultClientError } from "../http-result";
import { tRequest, IRoles, IAuth } from "../types";

const { unauthorized } = httpResultClientError;

export function auth<T>(httpRequest: tRequest<T>, roles: IRoles): IAuth {
  const jwtPayload = httpRequest.headers["x-jwt-payload"];
  if (typeof jwtPayload !== "string") {
    return {
      success: false,
      error: unauthorized({ error: "jwt is not defined" }),
      payload: { userId: "" },
    };
  }
  const jwt = JSON.parse(Buffer.from(jwtPayload, "base64").toString());
  // check if jwt is expired
  if (typeof jwt["exp"] !== "number") {
    return {
      success: false,
      error: unauthorized({ error: "invalid jwt" }),
      payload: { userId: "" },
    };
  }
  if (jwt["exp"] < Date.now() / 1000) {
    return {
      success: false,
      error: unauthorized({ error: "jwt expired" }),
      payload: { userId: "" },
    };
  }
  // check if jwt has id
  if (typeof jwt["sub"] !== "string") {
    return {
      success: false,
      error: unauthorized({ error: "invalid jwt" }),
      payload: { userId: "" },
    };
  }
  const { admin, accountant, assistant, customer, provider, support } = roles;
  // if admin, can access all the routes
  if (admin && jwt["admin"]) {
    return {
      success: true,
      error: unauthorized({ error: "" }),
      payload: { userId: jwt["sub"] },
    };
  }
  if (provider && jwt["provider"]) {
    return {
      success: true,
      error: unauthorized({ error: "" }),
      payload: { userId: jwt["sub"] },
    };
  }
  if (customer && jwt["customer"]) {
    return {
      success: true,
      error: unauthorized({ error: "" }),
      payload: { userId: jwt["sub"] },
    };
  }
  if (assistant && jwt["assistant"]) {
    return {
      success: true,
      error: unauthorized({ error: "" }),
      payload: { userId: jwt["sub"] },
    };
  }
  if (accountant && jwt["accountant"]) {
    return {
      success: true,
      error: unauthorized({ error: "" }),
      payload: { userId: jwt["sub"] },
    };
  }
  if (support && jwt["support"]) {
    return {
      success: true,
      error: unauthorized({ error: "" }),
      payload: { userId: jwt["sub"] },
    };
  }
  return {
    success: false,
    error: unauthorized({ error: "unauthorized" }),
    payload: { userId: "" },
  };
}
