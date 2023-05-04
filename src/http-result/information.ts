import { StatusCodes } from "http-status-codes";
import type { IErrorResult, IReqError } from "../types";

/**
 * Returns an error object containing an error code and error string for HTTP information responses.
 * @param args - An object that contains request error text.
 * @param code - HTTP status code.
 * @returns An object containing error number and error string.
 */
function information(args: IReqError, code: number): IErrorResult {
  const { error } = args;
  if (!error) throw new Error("HTTP: information error must be defined");
  return {
    code,
    error,
    payload: undefined,
  };
}

export function continueRequest(args: IReqError): IErrorResult {
  return information(args, StatusCodes.CONTINUE);
}

export function switchingProtocols(args: IReqError): IErrorResult {
  return information(args, StatusCodes.SWITCHING_PROTOCOLS);
}

export function processing(args: IReqError): IErrorResult {
  return information(args, StatusCodes.PROCESSING);
}

