# Code Usage Document

## Overview

The Function `auth` is used for authentication and role authorization based on a verified JSON Web Token (JWT) payload.
The function receives an HTTP request object ( Fastify HttpRequest) and a set of roles as parameters and returns an authentication result object.

## Usage

To use the `auth` function, follow these steps:

1. Define the roles object with the desired role permissions:

```typescript
const roles: IRoles = {
  admin: true,
  provider: false,
  assistant: false,
  customer: true,
  support: false,
  accountant: false,
};
```

2. Call the `auth` function with the HTTP request and roles:

```typescript
const { success, error, payload } = auth(httpRequest, roles);
```

5. Access the authentication result:

- `success`: A boolean value indicating whether the authentication was successful.
- `error`: An error object containing the error code, message, and payload if an error occurred during authentication.
- `payload`: An object containing the user ID and role if the authentication was successful.

## Function Signature

```typescript
function auth<T extends tRouteGenericInterface>(
  httpRequest: tRequest<T>,
  roles: IRoles
): IAuth;
```

## Parameters

- `httpRequest` (type: `tRequest<T>`): An Fastify HTTP request object that contains the headers. The verified JWT payload is expected to be present in the `"x-jwt-payload"` header field coming from Envoy Proxy.
- `roles` (type: `IRoles`): An object specifying the role permissions. Each role property should be a boolean value indicating whether the role is allowed (`true`) or not (`false`).

## Return Value

The `auth` function returns an object with the following properties:

- `success` (type: `boolean`): Indicates whether the authentication was successful. `true` if authorized, `false` otherwise.
- `error` (type: `IErrorResult | undefined`): An error object if an error occurred during authentication. It contains the error code, error message, and `undefined` payload. on the case of error there's no payload.
- `payload` (type: `{ userId: string, role: "admin" | "provider" | "customer" | "support" | "assistant" | "accountant" | "" }`): An object containing the user ID and role if the authentication was successful. The `userId` property is a string representing the user ID, and the `role` property specifies the role assigned to the user.

## Error Handling

If an error occurs during authentication, the `error` property of the returned object will be populated with an error object. The error object has the following structure:

```typescript
interface IErrorResult {
  code: StatusCodes; // An error code indicating the type of error (not provided in the code snippet)
  error: string; // A descriptive error message
  payload: undefined; // No additional payload provided in case of error
}
```

## Example

Here's an example usage of the `auth` function:

```typescript
import { auth, httpResult } from "aba-node";
import type { types } from "aba-node";

const { unauthorized } = httpResult.clientError;

// Fastify http request object
const httpRequest = {
  headers: {
    "x-jwt-payload": "eyJzdWIiOiAiMTIzNDU2Nzg5MCIsICJhZG1pbiI6ICJ0cnVlIn0=", // this comes from envoy proxy if token is verified
  },
};

const roles: IRoles = {
  admin: true,
  provider: false,
  assistant: false,
  customer: true,
  support: false,
  accountant: false,
};

// Call the auth function
const { success, error, payload } = auth(httpRequest, roles);

// Access the authentication result
if (success) {
  console.log("Authentication successful");
  console.log("User ID:", payload.userId);
  console.log("Role:", payload.role);
} else {
  console.error("Authentication failed");
  console.error("Error:", error.error);
}
```
