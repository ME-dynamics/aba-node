import { IErrorResult } from "./httpResult";

export interface IRoles {
  admin: boolean;
  provider: boolean;
  assistant: boolean;
  customer: boolean;
  support: boolean;
  accountant: boolean;
}

export interface IAuthError {
  success: false;
  error: IErrorResult;
  payload: undefined;
}
export interface IAuthSuccess {
  success: true;
  error: undefined;
  payload: {
    userId: string;
  };
}

export type tAuthResult = IAuthError | IAuthSuccess;
