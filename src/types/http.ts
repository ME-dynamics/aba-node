import {
  FastifyRequest,
  FastifyReply,
  FastifyInstance,
  FastifyServerOptions,
} from "fastify";

export type tRequest<T> = FastifyRequest<T>;
// http interfaces start
export type tReply = FastifyReply;
// http interfaces end

export type tHttpInstance = FastifyInstance;

export type tHttpOptions = FastifyServerOptions;

export interface IBuildRouteGen {
  version: string;
  service: string;
}
