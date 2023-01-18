import { AddressInfo } from "net";
import cors from "cors";
import express, { Express, Request, Response } from "express";
import { errorHandler } from "./middleware/error";
import { exit } from "process";
import { resolve } from "path";
import { apiConfigRoutes, catchAllRoutes, homeRoute, pingRoutes } from "./routes";
import { configureService } from "./api";

export const init = async (
  configFile: string,
  port: number
): Promise<Express> => {
  const apiConfigData = await configureService(configFile);

  if (apiConfigData instanceof Error) {
    console.error(apiConfigData);
    exit(1);
  }

  const app: Express = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.static(resolve(__dirname, "../public")));
  app.use(cors());

  app.use("/", apiConfigRoutes(apiConfigData));
  app.use(homeRoute);
  app.use("/", pingRoutes);
  app.use("/", catchAllRoutes);
  app.use(errorHandler);

  const listener = app.listen(port, "0.0.0.0", async () => {
    const { address, port } = listener?.address() as AddressInfo;
    console.log("Listening on port http://%s:%s", address, port);
  });

  return app;
};

export default init;
