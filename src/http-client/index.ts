import fastify from "fastify";
import { tHttpOptions } from "../types";

export function httpClient(args: tHttpOptions) {
  return fastify(args);
}

export { routeGen } from "./routeGen";
