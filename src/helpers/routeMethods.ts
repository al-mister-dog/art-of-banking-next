import { lectureRoutes } from "../sidebar-routes/lectureRoutes";

interface RouteObject {
  id: number;
  title: string;
  path: string;
  lectureId: number;
  keyTermsIds: number[];
}

export function getRouteObjectData(slug: string[]) {
  let foundRoute: RouteObject;

  lectureRoutes.routes.forEach((r) => {
    let found = r.routes.find((rt) => rt.path === `/${slug[0]}/${slug[1]}`);
    if (found) {
      foundRoute = found;
    }
  });

  if (foundRoute) {
    return foundRoute;
  } else {
    return undefined;
  }
}
