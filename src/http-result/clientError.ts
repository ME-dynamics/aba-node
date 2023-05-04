import { StatusCodes } from "http-status-codes";
import type { IErrorResult, IReqError } from "../types";
/**
 * Returns an error object containing an error code and error string for HTTP client errors.
 * @param args - An object that contains request error text.
 * @param code - HTTP status code.
 * @returns An object containing error number and error string.
 */
function clientError(args: IReqError, code: number): IErrorResult {
  const { error } = args;
  if (!error) throw new Error("HTTP: client error must be defined");
  return {
    code,
    error,
    payload: undefined,
  };
}


export function badRequest(args: IReqError): IErrorResult {
  return clientError(args, StatusCodes.BAD_REQUEST);
}


export function unauthorized(args: IReqError): IErrorResult {
  return clientError(args, StatusCodes.UNAUTHORIZED);
}


export function paymentRequired(args: IReqError): IErrorResult {
  return clientError(args, StatusCodes.PAYMENT_REQUIRED);
}


export function forbidden(args: IReqError): IErrorResult {
  return clientError(args, StatusCodes.FORBIDDEN);
}


export function notFound(args: IReqError): IErrorResult {
  return clientError(args, StatusCodes.NOT_FOUND);
}


export function methodNotAllowed(args: IReqError): IErrorResult {
  return clientError(args, StatusCodes.METHOD_NOT_ALLOWED);
}


export function notAcceptable(args: IReqError): IErrorResult {
  return clientError(args, StatusCodes.NOT_ACCEPTABLE);
}


export function proxyAuthenticationRequired(args: IReqError): IErrorResult {
  return clientError(args, StatusCodes.PROXY_AUTHENTICATION_REQUIRED);
}


export function requestTimeout(args: IReqError): IErrorResult {
  return clientError(args, StatusCodes.REQUEST_TIMEOUT);
}

export function conflict(args: IReqError): IErrorResult {
  return clientError(args, StatusCodes.CONFLICT);
}


export function gone(args: IReqError): IErrorResult {
  return clientError(args, StatusCodes.GONE);
}

export function lengthRequired(args: IReqError): IErrorResult {
  return clientError(args, StatusCodes.LENGTH_REQUIRED);
}

export function preconditionFailed(args: IReqError): IErrorResult {
  return clientError(args, StatusCodes.PRECONDITION_FAILED);
}


export function requestEntityTooLarge(args: IReqError): IErrorResult {
  return clientError(args, StatusCodes.REQUEST_TOO_LONG);
}

export function requestUriTooLong(args: IReqError): IErrorResult {
  return clientError(args, StatusCodes.REQUEST_URI_TOO_LONG);
}


export function unsupportedMediaType(args: IReqError): IErrorResult {
  return clientError(args, StatusCodes.UNSUPPORTED_MEDIA_TYPE);
}

export function requestedRangeNotSatisfiable(args: IReqError): IErrorResult {
  return clientError(args, StatusCodes.REQUESTED_RANGE_NOT_SATISFIABLE);
}

export function expectationFailed(args: IReqError): IErrorResult {
  return clientError(args, StatusCodes.EXPECTATION_FAILED);
}


export function imATeapot(args: IReqError): IErrorResult {
  return clientError(args, StatusCodes.IM_A_TEAPOT);
}


export function insufficientSpaceOnResource(args: IReqError): IErrorResult {
  return clientError(args, StatusCodes.INSUFFICIENT_SPACE_ON_RESOURCE);
}




export function unProcessableEntity(args: IReqError): IErrorResult {
  return clientError(args, StatusCodes.UNPROCESSABLE_ENTITY);
}


export function locked(args: IReqError): IErrorResult {
  return clientError(args, StatusCodes.LOCKED);
}


export function failedDependency(args: IReqError): IErrorResult {
  return clientError(args, StatusCodes.FAILED_DEPENDENCY);
}


export function preconditionRequired(args: IReqError): IErrorResult {
  return clientError(args, StatusCodes.PRECONDITION_REQUIRED);
}


export function tooManyRequests(args: IReqError): IErrorResult {
  return clientError(args, StatusCodes.TOO_MANY_REQUESTS);
}


export function requestHeaderFieldsTooLarge(args: IReqError): IErrorResult {
  return clientError(args, StatusCodes.REQUEST_HEADER_FIELDS_TOO_LARGE);
}


export function unavailableForLegalReasons(args: IReqError): IErrorResult {
  return clientError(args, StatusCodes.UNAVAILABLE_FOR_LEGAL_REASONS);
}
