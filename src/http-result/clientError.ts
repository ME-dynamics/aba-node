import { StatusCodes } from "http-status-codes";
import { IErrorResult, IReqError } from "../types";

/**
 ** general function for http client error
 * @param args an object that contains request error text
 * @param code http status code
 * @returns an object containing error number and error string
 */
function clientError(args: IReqError, code: number): IErrorResult {
  const { error } = args;
  if (!error) throw new Error("HTTP: client error must be defined");
  return {
    code,
    error,
  };
}

/**
 ** bad request
 * @param args an object that contains request error text
 * @returns an object containing error number and error string
 */
export function badRequest(args: IReqError): IErrorResult {
  return clientError(args, StatusCodes.BAD_REQUEST);
}

/**
 ** unauthorized
 * @param args an object that contains request error text
 * @returns an object containing error number and error string
 */
export function unauthorized(args: IReqError): IErrorResult {
  return clientError(args, StatusCodes.UNAUTHORIZED);
}

/**
 ** payment required
 * @param args an object that contains request error text
 * @returns an object containing error number and error string
 */
export function paymentRequired(args: IReqError): IErrorResult {
  return clientError(args, StatusCodes.PAYMENT_REQUIRED);
}

/**
 ** forbidden
 * @param args an object that contains request error text
 * @returns an object containing error number and error string
 */
export function forbidden(args: IReqError): IErrorResult {
  return clientError(args, StatusCodes.FORBIDDEN);
}

/**
 ** not found
 * @param args an object that contains request error text
 * @returns an object containing error number and error string
 */
export function notFound(args: IReqError): IErrorResult {
  return clientError(args, StatusCodes.NOT_FOUND);
}

/**
 ** method not allowed
 * @param args an object that contains request error text
 * @returns an object containing error number and error string
 */
export function methodNotAllowed(args: IReqError): IErrorResult {
  return clientError(args, StatusCodes.METHOD_NOT_ALLOWED);
}

/**
 ** not acceptable
 * @param args an object that contains request error text
 * @returns an object containing error number and error string
 */

export function notAcceptable(args: IReqError): IErrorResult {
  return clientError(args, StatusCodes.NOT_ACCEPTABLE);
}

/**
 ** proxy authentication required
 * @param args an object that contains request error text
 * @returns an object containing error number and error string
 */
export function proxyAuthenticationRequired(
  args: IReqError
): IErrorResult {
  return clientError(args, StatusCodes.PROXY_AUTHENTICATION_REQUIRED);
}

/**
 ** request timeout
 * @param args an object that contains request error text
 * @returns an object containing error number and error string
 */
export function requestTimeout(args: IReqError): IErrorResult {
  return clientError(args, StatusCodes.REQUEST_TIMEOUT);
}

/**
 ** conflict
 * @param args an object that contains request error text
 * @returns an object containing error number and error string
 */

export function conflict(args: IReqError): IErrorResult {
  return clientError(args, StatusCodes.CONFLICT);
}

/**
 ** gone
 * @param args an object that contains request error text
 * @returns an object containing error number and error string
 */
export function gone(args: IReqError): IErrorResult {
  return clientError(args, StatusCodes.GONE);
}

/**
 ** length required
 * @param args an object that contains request error text
 * @returns an object containing error number and error string
 */
export function lengthRequired(args: IReqError): IErrorResult {
  return clientError(args, StatusCodes.LENGTH_REQUIRED);
}

/**
 ** precondition failed
 * @param args an object that contains request error text
 * @returns an object containing error number and error string
 */
export function preconditionFailed(args: IReqError): IErrorResult {
  return clientError(args, StatusCodes.PRECONDITION_FAILED);
}

/**
 ** request entity too large
 * @param args an object that contains request error text
 * @returns an object containing error number and error string
 */
export function requestEntityTooLarge(args: IReqError): IErrorResult {
  return clientError(args, StatusCodes.REQUEST_TOO_LONG);
}


/**
 ** request uri too long
 * @param args an object that contains request error text
 * @returns an object containing error number and error string
 */
export function requestUriTooLong(args: IReqError): IErrorResult {
  return clientError(args, StatusCodes.REQUEST_URI_TOO_LONG);
}

/**
 ** unsupported media type
 * @param args an object that contains request error text
 * @returns an object containing error number and error string
 */
export function unsupportedMediaType(args: IReqError): IErrorResult {
  return clientError(args, StatusCodes.UNSUPPORTED_MEDIA_TYPE);
}

/**
 ** requested range not satisfiable
 * @param args an object that contains request error text
 * @returns an object containing error number and error string
 */
export function requestedRangeNotSatisfiable(
  args: IReqError
): IErrorResult {
  return clientError(args, StatusCodes.REQUESTED_RANGE_NOT_SATISFIABLE);
}

/**
 ** expectation failed
 * @param args an object that contains request error text
 * @returns an object containing error number and error string
 */
export function expectationFailed(args: IReqError): IErrorResult {
  return clientError(args, StatusCodes.EXPECTATION_FAILED);
}

/**
 ** im a teapot
 * @param args an object that contains request error text
 * @returns an object containing error number and error string
 */
export function imATeapot(args: IReqError): IErrorResult {
  return clientError(args, StatusCodes.IM_A_TEAPOT);
}

/**
 ** insufficient space on resource
 * @param args an object that contains request error text
 * @returns an object containing error number and error string
 */
export function insufficientSpaceOnResource(
  args: IReqError
): IErrorResult {
  return clientError(args, StatusCodes.INSUFFICIENT_SPACE_ON_RESOURCE);
}

// export function method_failure(args: IReqError): IErrorResult {
//   return clientError(args, StatusCodes.METHOD_FAILURE);
// }

/**
 ** un_processable entity
 * @param args an object that contains request error text
 * @returns an object containing error number and error string
 */
export function unProcessableEntity(args: IReqError): IErrorResult {
  return clientError(args, StatusCodes.UNPROCESSABLE_ENTITY);
}

/**
 ** locked
 * @param args an object that contains request error text
 * @returns an object containing error number and error string
 */
export function locked(args: IReqError): IErrorResult {
  return clientError(args, StatusCodes.LOCKED);
}

/**
 ** failed dependency
 * @param args an object that contains request error text
 * @returns an object containing error number and error string
 */
export function failedDependency(args: IReqError): IErrorResult {
  return clientError(args, StatusCodes.FAILED_DEPENDENCY);
}

/**
 ** precondition required
 * @param args an object that contains request error text
 * @returns an object containing error number and error string
 */
export function preconditionRequired(args: IReqError): IErrorResult {
  return clientError(args, StatusCodes.PRECONDITION_REQUIRED);
}

/**
 ** too many requests
 * @param args an object that contains request error text
 * @returns an object containing error number and error string
 */
export function tooManyRequests(args: IReqError): IErrorResult {
  return clientError(args, StatusCodes.TOO_MANY_REQUESTS);
}

/**
 ** request header fields too large
 * @param args an object that contains request error text
 * @returns an object containing error number and error string
 */
export function requestHeaderFieldsTooLarge(
  args: IReqError
): IErrorResult {
  return clientError(args, StatusCodes.REQUEST_HEADER_FIELDS_TOO_LARGE);
}

/**
 ** unavailable for legal reasons
 * @param args an object that contains request error text
 * @returns an object containing error number and error string
 */
export function unavailableForLegalReasons(
  args: IReqError
): IErrorResult {
  return clientError(args, StatusCodes.UNAVAILABLE_FOR_LEGAL_REASONS);
}
