# Http Success

The `httpResult.success` namespace contains functions for generating HTTP responses with success codes. Each function takes an argument of type `IPayload<T>`, which represents the payload object to be included in the response, and returns an object of type `IPayloadResult<T>`, containing the success code, payload, and an undefined error.

**Example**: ok

The `ok` function is used to generate a success response with the HTTP status code `200 OK`. It takes an argument of type `IPayload<T>`, which represents the payload object to be included in the response. The function returns an object of type `IPayloadResult<T>`, containing the success code, payload, and an undefined error.

## Usage

To use the `ok` function, follow these steps:

1. Import the function:

```typescript
import { httpResult } from "aba-node";
// access success functions through httpResult.success
```

2. Call the function with the payload object:

```typescript
const { ok } = httpResult.success;
const successResponse = ok({ payload: { key: "value" } });
```

[Type Parameter]

- `T`: The type of the payload object. It can be any valid TypeScript type.

```typescript
const successResponse = ok<number>({ payload: 123 });
```

[Parameters]

- `args` (type: `IPayload<T>`): An object representing the payload to be included in the success response. It has the following properties:
  - `payload` (type: `T`): The payload object to be included in the response.

[Return Value]
The `ok` function returns an object of type `IPayloadResult<T>`, which has the following properties:

- `code` (type: `StatusCodes`): The HTTP status code for the success response, which is `200` in this case.
- `payload` (type: `T`): The payload object included in the response.
- `error` (type: `undefined`): This property is always `undefined` for success responses.

[Example]

```typescript
import { httpResult } from "aba-node";
const { ok } = httpResult.success;
const successResponse = ok({ payload: { key: "value" } });
console.log(successResponse);
```

The above code will generate a success response object with the following structure:

```typescript
{
  code: 200,
  payload: { key: 'value' },
  error: undefined
}
```

---

Here's a brief explanation of the other functions:

- `created`: Generates a success response with the HTTP status code `201 Created`.
- `noContent`: Generates a success response with the HTTP status code `204 No Content`.
- `accepted`: Generates a success response with the HTTP status code `202 Accepted`.
- `nonAuthoritativeInformation`: Generates a success response with the HTTP status code `203 Non-Authoritative Information`.
- `resetContent`: Generates a success response with the HTTP status code `205 Reset Content`.
- `partialContent`: Generates a success response with the HTTP status code `206 Partial Content`.
- `multiStatus`: Generates a success response with the HTTP status code `207 Multi-Status`.

Each function follows a similar pattern, taking an argument of type `IPayload<T>` and returning an object of type `IPayloadResult<T>` with the corresponding HTTP status code.

Please note that the explanations provided here are brief summaries, and you can refer to the individual functions' documentation for more detailed information.
