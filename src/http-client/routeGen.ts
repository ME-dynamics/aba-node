import { ErrorFactory } from "aba-utils";
import type { IBuildRouteGen } from "../types";

export function buildRouteGenerator(args: IBuildRouteGen) {
  const { version, service } = args;
  const base = `/api/${version}/${service}`;
  const isDev = process.env.NODE_ENV !== "production";
  return function routeGen(routes: string[]) {
    if (routes.length === 0) {
      if (isDev) console.log(base);
      return base;
    }
    let finalRoute = "/";
    for (let index = 0; index < routes.length; index++) {
      const route = routes[index];
      for (let charIndex = 0; charIndex < route.length; charIndex++) {
        const char = route[charIndex];
        if (char === " ") {
          throw new ErrorFactory({
            name: "invalid route",
            message: "route cannot contain spaces",
            detail: `route: ${route}`,
            nativeError: undefined,
            path: `${base}`,
          });
        }
        if (char === "/") {
          throw new ErrorFactory({
            name: "invalid route",
            message: "route cannot contain /",
            detail: `route: ${route}`,
            nativeError: undefined,
            path: `${base}`,
          });
        }
      }
      finalRoute += route;
      if (index !== routes.length - 1) {
        finalRoute += "/";
      }
    }
    const route = `${base}${finalRoute}`;
    if (isDev) {
      console.log(`route: ${route}`);
    }
    return `${base}${finalRoute}`;
  };
}
