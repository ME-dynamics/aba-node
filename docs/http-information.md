# Http Information

The `httpResult.information` namespace contains functions for generating HTTP responses with information codes. Each function takes an argument of type `IPayload<T>`, which represents the payload object to be included in the response, and returns an object of type `IPayloadResult<T>`, containing the information code, payload, and an undefined error.

**Example**: continueRequest

The `continueRequest` function is used to generate an HTTP information response with the status code `100 Continue`. It takes an argument of type `IPayload<T>`, which represents the payload object to be included in the response. The function returns an object of type `IPayloadResult<T>`, containing the information code, payload, and an undefined error.

## Usage

To use the `continueRequest` function, follow these steps:

1. Import the function:

```typescript
import { httpResult } from "aba-node";
// access information functions through httpResult.information
```

2. Call the function with the payload object:

```typescript
const { continueRequest } = httpResult.information;
const response = continueRequest({ payload: { key: "value" } });
```

[Type Parameter]

- `T`: The type of the payload object. It can be any valid TypeScript type.

[Parameters]

- `args` (type: `IPayload<T>`): An object representing the payload to be included in the information response. It has the following properties:
  - `payload` (type: `T`): The payload object to be included in the response.

[Return Value]
The `continueRequest` function returns an object of type `IPayloadResult<T>`, which has the following properties:

- `code` (type: `number`): The HTTP status code for the information response, which is `100` in this case.
- `payload` (type: `T`): The payload object included in the response.
- `error` (type: `undefined`): This property is always `undefined` for information responses.

[Example]

```typescript
import { httpResult } from "aba-node";
const { continueRequest } = httpResult.information;
const response = continueRequest({ payload: { key: "value" } });
console.log(response);
```

The above code will generate an information response object with the following structure:

```typescript
{
  code: 100,
  payload: { key: 'value' },
  error: undefined
}
```

---

Here's a brief explanation of the other functions:

- `switchingProtocols`: Generates an information response with the HTTP status code `101 Switching Protocols`.
- `processing`: Generates an information response with the HTTP status code `102 Processing`.

Each function follows a similar pattern, taking an argument of type `IPayload<T>` and returning an object of type `IPayloadResult<T>` with the corresponding HTTP status code.
