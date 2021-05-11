import { StatusCodes } from "http-status-codes";
import { IErrorResult, IReqError } from "../types";

/**
 ** general function for server error 
 * @param args 
 * @param code 
 * @returns an object containing code number and error string
 */
function serverError(args: IReqError, code: number): IErrorResult {
    const { error } = args;
    if (!error) throw new Error("HTTP: server error must be defined")
    return {
      code,
      error
    };
}


/**
 ** internal server error 
 * @param args 
 * @returns an object containing code number and error string
 */
export function internalServerError(args: IReqError): IErrorResult {
    return serverError(args, StatusCodes.INTERNAL_SERVER_ERROR);
}


/**
 ** not implemented 
 * @param args 
 * @returns an object containing code number and error string
 */
export function notImplemented(args: IReqError): IErrorResult {
    return serverError(args, StatusCodes.NOT_IMPLEMENTED);
}

/**
 ** bad gateway 
 * @param args 
 * @returns an object containing code number and error string
 */
export function badGateway(args: IReqError): IErrorResult {
    return serverError(args, StatusCodes.BAD_GATEWAY);
}

/**
 ** service unavailable 
 * @param args 
 * @returns an object containing code number and error string
 */
export function serviceUnavailable(args: IReqError): IErrorResult {
    return serverError(args, StatusCodes.SERVICE_UNAVAILABLE);
}

/**
 ** gateway timeout
 * @param args 
 * @returns an object containing code number and error string
 */
export function gatewayTimeout(args: IReqError): IErrorResult {
    return serverError(args, StatusCodes.GATEWAY_TIMEOUT);
}

/**
 ** http version not supported 
 * @param args 
 * @returns an object containing code number and error string
 */
export function httpVersionNotSupported(args: IReqError): IErrorResult {
    return serverError(args, StatusCodes.HTTP_VERSION_NOT_SUPPORTED);
}


/**
 ** insufficient storage 
 * @param args 
 * @returns an object containing code number and error string
 */
export function insufficientStorage(args: IReqError): IErrorResult {
    return serverError(args, StatusCodes.INSUFFICIENT_STORAGE);
}

/**
 ** network authentication required 
 * @param args 
 * @returns an object containing code number and error string
 */
export function networkAuthenticationRequired(args: IReqError): IErrorResult {
    return serverError(args, StatusCodes.NETWORK_AUTHENTICATION_REQUIRED);
}