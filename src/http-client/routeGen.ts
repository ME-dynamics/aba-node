import { ErrorFactory } from "aba-utils";
import { buildLogger } from "../logger";
import type { IBuildRouteGen } from "../types";

export function buildRouteGenerator(args: IBuildRouteGen) {
  const { version, service } = args;
  const base = `/api/${version}/${service}`;
  const isDev = process.env["NODE_ENV"] !== "production";
  const logger = buildLogger({
    app: `${service}-${version}`,
    info: base,
    layer: "route-gen",
  });
  return function routeGen(routes: string[]) {
    const log = logger.metadata({ routes }).init();
    if (routes.length === 0) {
      if (isDev) log.info("no routes provided, returning base route", { base });
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
          });
        }
        if (char === "/") {
          throw new ErrorFactory({
            name: "invalid route",
            message: "route cannot contain /",
            detail: `route: ${route}`,
            nativeError: undefined,
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
      log.info("generated route", { route });
    }
    return `${base}${finalRoute}`;
  };
}
