import { Router } from "express";
import { apiConfig } from "../controllers";

const router: Router = Router();

export default (apiConfigData: IServiceConfiguration) => {
  const { name, endPoints } = apiConfigData as IServiceConfiguration;

  endPoints.forEach(async ({ request, response }, i) => {
    const queryParams = (request as IServiceEndPointRequest)?.queryParams;
    const params = queryParams
      ? new URLSearchParams(queryParams as any).toString()
      : "";
    const routePath =
      typeof request === "string"
        ? request
        : `${request.path}${params ? `?${params}` : ""}`;
    if (typeof request === "string") {
      router.route(routePath).get(await apiConfig(response));
    } else {
      (router.route(routePath) as any)[
        request.method?.toLowerCase?.() || "get"
      ](await apiConfig(response));
    }
  });

  return router;
};
