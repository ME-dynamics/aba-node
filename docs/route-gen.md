## Route Generator 

The `buildRouteGenerator` function is used to generate REST routes based on a specified version and service.

### Usage

To use the `buildRouteGenerator` function, you need to import it into your code and call it with the desired arguments.

```typescript
import { buildRouteGenerator } from "aba-node";

// Define the version and service for the route generator
const args = {
  version: "v1", // Specify the version
  service: "users", // Specify the service
};

// Build the route generator
const generateRoute = buildRouteGenerator(args);

// Generate routes using the route generator
const routes = ["profile", "settings"];
const generatedRoute = generateRoute(routes);
console.log("Generated Route:", generatedRoute);
```

In this example, the `buildRouteGenerator` function is called with `version` set to "v1" and `service` set to "users". The route generator is built, and then it is used to generate a route based on the provided routes array. The generated route is logged to the console as "Generated Route".

The output in the console will be:

```
Generated Route: /api/v1/users/profile/settings
```

