import { FastifyRequest, FastifyReply, RouteGenericInterface } from "fastify";

export type tRequest<T extends RouteGenericInterface> = FastifyRequest<T>;
// http interfaces start
export type tReply = FastifyReply;
// http interfaces end


export interface IHttpClient {
    dev: boolean;
}