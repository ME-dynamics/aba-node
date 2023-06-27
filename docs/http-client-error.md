# Http Client Error

The `httpResult.clientError` namespace contains functions for generating HTTP responses with client errors. Each function takes an argument of type `IReqError`, which represents the error details, and returns an object of type `IErrorResult`, containing the error code, error message, and payload.

Example: badRequest

The `badRequest` function is used to generate an error response with the HTTP status code `400 Bad Request`. It takes an argument of type `IReqError`, which represents the error details. The function returns an object of type `IErrorResult`, containing the error code, error message, and payload.

## Usage

To use the `badRequest` function, follow these steps:

1. Import the function:

```typescript
import { httpResult } from "aba-node";
// access clientError functions through httpResult.clientError
```

2. Call the function with the error details:

```typescript
const errorResponse = badRequest({ error: "error example here" });
```

[Parameters]

- `args` (type: `IReqError`): An object representing the error details. It has the following properties:
  - `error` (type: `string`): The error message or description.

[Return Value]
The `badRequest` function returns an object of type `IErrorResult`, which has the following properties:

- `code` (type: `StatusCodes`): The HTTP status code for the error, which is `400` in this case.
- `error` (type: `string`): The error message or description.
- `payload` (type: `undefined`): This property is always `undefined` for client errors.

[Example]

```typescript
import { httpResult } from "aba-node";
const { badRequest } = httpResult.clientError;
const errorResponse = badRequest({ error: "Bad request" });
console.log(errorResponse);
```

The above code will generate an error response object with the following structure:

```typescript
{
  code: 400,
  error: "Bad request",
  payload: undefined
}
```

---

Now, here's a brief explanation about the other functions:

- `unauthorized`: Generates an error response with the HTTP status code `401 Unauthorized`.
- `paymentRequired`: Generates an error response with the HTTP status code `402 Payment Required`.
- `forbidden`: Generates an error response with the HTTP status code `403 Forbidden`.
- `notFound`: Generates an error response with the HTTP status code `404 Not Found`.
- `methodNotAllowed`: Generates an error response with the HTTP status code `405 Method Not Allowed`.
- `notAcceptable`: Generates an error response with the HTTP status code `406 Not Acceptable`.
- `proxyAuthenticationRequired`: Generates an error response with the HTTP status code `407 Proxy Authentication Required`.
- `requestTimeout`: Generates an error response with the HTTP status code `408 Request Timeout`.
- `conflict`: Generates an error response with the HTTP status code `409 Conflict`.
- `gone`: Generates an error response with the HTTP status code `410 Gone`.
- `lengthRequired`: Generates an error response with the HTTP status code `411 Length Required`.
- `preconditionFailed`: Generates an error response with the HTTP status code `412 Precondition Failed`.
- `requestEntityTooLarge`: Generates an error response with the HTTP status code `413 Request Entity Too Large`.
- `requestUriTooLong`: Generates an error response with the HTTP status code `414 Request-URI Too Long`.
- `unsupportedMediaType`: Generates an error response with the HTTP status code `415 Unsupported Media Type`.
- `requestedRangeNotSatisfiable`: Generates an error response with the HTTP status code `416 Requested Range Not Satisfiable`.
- `expectationFailed`: Generates an error response with the HTTP status code `417 Expectation Failed`.
- `imATeapot`: Generates an error response with the HTTP status code `418 I'm a teapot`.
- `insufficientSpace

OnResource`: Generates an error response with the HTTP status code `419 Insufficient Space on Resource`.

- `unProcessableEntity`: Generates an error response with the HTTP status code `422 Unprocessable Entity`.
- `locked`: Generates an error response with the HTTP status code `423 Locked`.
- `failedDependency`: Generates an error response with the HTTP status code `424 Failed Dependency`.
- `preconditionRequired`: Generates an error response with the HTTP status code `428 Precondition Required`.
- `tooManyRequests`: Generates an error response with the HTTP status code `429 Too Many Requests`.
- `requestHeaderFieldsTooLarge`: Generates an error response with the HTTP status code `431 Request Header Fields Too Large`.
- `unavailableForLegalReasons`: Generates an error response with the HTTP status code `451 Unavailable For Legal Reasons`.

Each function follows a similar pattern, taking an argument of type `IReqError` and returning an object of type `IErrorResult` with the corresponding HTTP status code.
