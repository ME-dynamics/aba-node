# Http Redirection

The `httpResult.redirection` namespace contains functions for generating HTTP responses with redirections. Each function takes an argument of type `IUrl`, which represents the URL to redirect to, and returns an object of type `IPayloadResult<IUrl>`, containing the error code, payload, and URL.

Example: multipleChoices

The `multipleChoices` function is used to generate a redirection response with the HTTP status code `300 Multiple Choices`. It takes an argument of type `IUrl`, which represents the URL to redirect to. The function returns an object of type `IPayloadResult<IUrl>`, containing the error code, payload, and URL.

## Usage

To use the `multipleChoices` function, follow these steps:

1. Import the function:

```typescript
import { httpResult } from "aba-node";
// access redirection functions through httpResult.redirection
```

2. Call the function with the URL to redirect to:

```typescript
const { multipleChoices } = httpResult.redirection;
const redirectionResponse = multipleChoices({ url: "https://example.com" });
```

[Parameters]

- `args` (type: `IUrl`): An object representing the URL to redirect to. It has the following properties:
  - `url` (type: `string`): The URL to redirect to.

[Return Value]
The `multipleChoices` function returns an object of type `IPayloadResult<IUrl>`, which has the following properties:

- `code` (type: `StatusCodes`): The HTTP status code for the redirection, which is `300` in this case.
- `payload` (type: `IUrl`): An object containing the URL to redirect to.
  - `url` (type: `string`): The URL to redirect to.

[Example]

```typescript
import { multipleChoices } from "httpResult";

const redirectionResponse = multipleChoices({ url: "https://example.com" });
console.log(redirectionResponse);
```

The above code will generate a redirection response object with the following structure:

```typescript
{
  code: 300,
  payload: {
    url: "https://example.com"
  }
}
```

---

Here's a brief explanation of the other functions:

- `movedPermanently`: Generates a redirection response with the HTTP status code `301 Moved Permanently`.
- `movedTemporarily`: Generates a redirection response with the HTTP status code `302 Moved Temporarily`.
- `seeOther`: Generates a redirection response with the HTTP status code `303 See Other`.
- `notModified`: Generates a redirection response with the HTTP status code `304 Not Modified`.
- `temporaryRedirect`: Generates a redirection response with the HTTP status code `307 Temporary Redirect`.
- `permanentRedirect`: Generates a redirection response with the HTTP status code `308 Permanent Redirect`.

Each function follows a similar pattern, taking an argument of type `IUrl` and returning an object of type `IPayloadResult<IUrl>` with the corresponding HTTP status code.
