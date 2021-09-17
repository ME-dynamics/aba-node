import { StatusCodes } from "http-status-codes";

export interface IPayloadResult<T> {
  code: StatusCodes;
  payload: T;
  error: undefined;
}

export interface IErrorResult {
  code: StatusCodes;
  error: string;
  payload: undefined;
}
export interface IPayload<T> {
  payload: T ;
}
export interface IReqError {
  error: string;
}
export interface IUrl {
  url: string;
}

export type tHttpVerbs = "GET" | "HEAD" | "POST" | "PUT" | "PATCH" | "DELETE";
