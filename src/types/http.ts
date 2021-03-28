import { FastifyRequest, FastifyReply } from "fastify";

export type tRequest<T> = FastifyRequest<T>;
// http interfaces start
export type tReply = FastifyReply;
// http interfaces end


export interface IHttpClient {
    dev: boolean;
}