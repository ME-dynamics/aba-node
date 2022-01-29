import { IErrorResult } from "./httpResult";

export interface IRoles {
  admin: boolean;
  provider: boolean;
  assistant: boolean;
  customer: boolean;
  support: boolean;
  accountant: boolean;
}

export interface IAuth {
  success: boolean;
  error: IErrorResult;
  payload: {
    userId: string;
    role:
      | "admin"
      | "provider"
      | "customer"
      | "support"
      | "assistant"
      | "accountant"
      | "";
  };
}
