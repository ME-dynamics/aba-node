import fastify from "fastify";
import type { tHttpOptions } from "../types";

export function httpClient(args: tHttpOptions) {
  return fastify(args);
}

export { buildRouteGenerator } from "./routeGen";
