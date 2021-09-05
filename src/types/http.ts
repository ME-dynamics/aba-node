import { FastifyRequest, FastifyReply, FastifyInstance } from "fastify";

export type tRequest<T> = FastifyRequest<T>;
// http interfaces start
export type tReply = FastifyReply;
// http interfaces end

export type tHttpInstance = FastifyInstance;

export interface IHttpClient {
    dev: boolean;
}

