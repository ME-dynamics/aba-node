import fastify from "fastify";
import type { IHttpClient } from "../types"


export function httpClient(args: IHttpClient) {
    const { dev } = args
    return fastify({logger: dev});
}