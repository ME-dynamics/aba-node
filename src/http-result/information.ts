import { StatusCodes } from "http-status-codes";
import type { IPayload, IPayloadResult } from "../types";

/**
 * Returns an error object containing an error code and error string for HTTP information responses.
 * @param args - An object that contains request error text.
 * @param code - HTTP status code.
 * @returns An object containing error number and error string.
 */
function information<T>(args: IPayload<T>, code: number): IPayloadResult<T> {
  const { payload } = args;
  if (!payload) throw new Error("HTTP: information payload must be defined");
  return {
    code,
    error: undefined,
    payload,
  };
}

export function continueRequest<T>(args: IPayload<T>): IPayloadResult<T> {
  return information(args, StatusCodes.CONTINUE);
}

export function switchingProtocols<T>(args: IPayload<T>): IPayloadResult<T> {
  return information(args, StatusCodes.SWITCHING_PROTOCOLS);
}

export function processing<T>(args: IPayload<T>): IPayloadResult<T> {
  return information(args, StatusCodes.PROCESSING);
}