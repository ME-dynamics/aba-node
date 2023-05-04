import * as httpResultSuccess from "./success";
import * as httpResultClientError from "./clientError";
import * as httpResultInformation from "./information";
import * as httpResultServerError from "./serverError";
import * as httpResultRedirection from "./redirection";

export const httpResult = {
  success: httpResultSuccess,
  clientError: httpResultClientError,
  information: httpResultInformation,
  serverError: httpResultServerError,
  redirection: httpResultRedirection,
};
