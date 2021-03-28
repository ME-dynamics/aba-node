import { StatusCodes } from "http-status-codes";
import { IPayloadResult, IPayload } from "../types";


/**
 ** general function for success http result 
 * @param args an object containing payload object
 * @param code http status code number
 * @returns an object containing code number and payload
 */
function success<T>(args: IPayload<T>, code: number): IPayloadResult<T> {
  const { payload } = args;
  if (!payload) throw new Error("HTTP: payload must be defined");
  return {
    code,
    payload,
  };
}

/**
 ** ok  
 * @param args an object containing payload object
 * @returns an object containing code number and payload
 */
export function ok<T>(args: IPayload<T>): IPayloadResult<T> {
  return success(args, StatusCodes.OK);
}

/**
 ** created  
 * @param args an object containing payload object
 * @returns an object containing code number and payload
 */
export function created<T>(args: IPayload<T>): IPayloadResult<T> {
  return success(args, StatusCodes.CREATED);
}

/**
 ** no content  
 * @param args an object containing payload object
 * @returns an object containing code number and payload
 */
export function noContent<T>(args: IPayload<T>): IPayloadResult<T> {
  return success(args, StatusCodes.NO_CONTENT);
}



/**
 ** accepted  
 * @param args an object containing payload object
 * @returns an object containing code number and payload
 */
export function accepted<T>(args: IPayload<T>): IPayloadResult<T> {
  return success(args, StatusCodes.ACCEPTED);
}

/**
 ** non authoritative information  
 * @param args an object containing payload object
 * @returns an object containing code number and payload
 */
export function nonAuthoritativeInformation<T>(
  args: IPayload<T>
): IPayloadResult<T> {
  return success(args, StatusCodes.NON_AUTHORITATIVE_INFORMATION);
}

/**
 ** reset content  
 * @param args an object containing payload object
 * @returns an object containing code number and payload
 */
export function resetContent<T>(args: IPayload<T>): IPayloadResult<T> {
  return success(args, StatusCodes.RESET_CONTENT);
}

/**
 ** partial content  
 * @param args an object containing payload object
 * @returns an object containing code number and payload
 */
export function partialContent<T>(args: IPayload<T>): IPayloadResult<T> {
  return success(args, StatusCodes.PARTIAL_CONTENT);
}

/**
 ** multi status  
 * @param args an object containing payload object
 * @returns an object containing code number and payload
 */
export function multiStatus<T>(args: IPayload<T>): IPayloadResult<T> {
  return success(args, StatusCodes.MULTI_STATUS);
}
