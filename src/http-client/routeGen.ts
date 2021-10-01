import { IRouteGen } from "../types";

export function routeGen(args: IRouteGen) {
  const { version, role, routes } = args;
  let finalRoute = "";
  const length = routes.length;
  for (let index = 0; index < length; index++) {
    const route = routes[index];
    for (let index = 0; index < route.length; index++) {
      const char = route[index];
      if (char === "/") {
        continue;
      }
      finalRoute = finalRoute + char;
    }
    if (index !== length - 1) {
      finalRoute = finalRoute + "/";
    }
  }
  const apiRoute = `/api/${version}/${
    role === "shared" ? "" : `${role}/`
  }${finalRoute}`;
  return apiRoute;
}