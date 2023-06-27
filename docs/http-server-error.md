# Http Server Error

The `httpResult.serverError` namespace contains functions for generating HTTP responses with server errors. Each function takes an argument of type `IReqError`, which represents the error details, and returns an object of type `IErrorResult`, containing the error code, error message, and payload.


**Example**: internalServerError 

The `internalServerError` function is used to generate a server error response with the HTTP status code `500 Internal Server Error`. It takes an argument of type `IReqError`, which represents the error details. The function returns an object of type `IErrorResult`, containing the error code, error message, and payload.

## Usage
To use the `internalServerError` function, follow these steps:

1. Import the function:
```typescript
import { internalServerError } from 'aba-node';
// access serverError functions through httpResult.serverError
```

2. Call the function with the error details:
```typescript
const { internalServerError } = httpResult.serverError;
const errorResponse = internalServerError({ error: "error example here" });
```

[Parameters]
- `args` (type: `IReqError`): An object representing the error details. It has the following properties:
  - `error` (type: `string`): The error message or description.

[Return Value]
The `internalServerError` function returns an object of type `IErrorResult`, which has the following properties:
- `code` (type: `StatusCodes`): The HTTP status code for the server error response, which is `500` in this case.
- `error` (type: `string`): The error message or description.
- `payload` (type: `undefined`): This property is always `undefined` for server error responses.

[Example]
```typescript
import { httpResult } from 'aba-node';
const { internalServerError } = httpResult.serverError;
const errorResponse = internalServerError({ error: "Internal Server Error" });
console.log(errorResponse);
```

The above code will generate an error response object with the following structure:
```typescript
{
  code: 500,
  error: "Internal Server Error",
  payload: undefined
}
```

---

Here's a brief explanation of the other functions:

- `notImplemented`: Generates a server error response with the HTTP status code `501 Not Implemented`.
- `badGateway`: Generates a server error response with the HTTP status code `502 Bad Gateway`.
- `serviceUnavailable`: Generates a server error response with the HTTP status code `503 Service Unavailable`.
- `gatewayTimeout`: Generates a server error response with the HTTP status code `504 Gateway Timeout`.
- `httpVersionNotSupported`: Generates a server error response with the HTTP status code `505 HTTP Version Not Supported`.
- `insufficientStorage`: Generates a server error response with the HTTP status code `507 Insufficient Storage`.
- `networkAuthenticationRequired`: Generates a server error response with the HTTP status code `511 Network Authentication Required`.

Each function follows a similar pattern, taking an argument of type `IReqError` and returning an object of type `IErrorResult` with the corresponding HTTP status code.
