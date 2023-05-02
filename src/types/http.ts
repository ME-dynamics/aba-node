import {
  FastifyRequest,
  FastifyReply,
  FastifyInstance,
  FastifyServerOptions,
  RouteGenericInterface
} from "fastify";

export type tRequest<T extends RouteGenericInterface> = FastifyRequest<T>;
// http interfaces start
export type tReply = FastifyReply;
// http interfaces end

export type tHttpInstance = FastifyInstance;

export type tHttpOptions = FastifyServerOptions;

export interface IBuildRouteGen {
  version: string;
  service: string;
}

export type tRouteGenericInterface = RouteGenericInterface;