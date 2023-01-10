import { init } from "./app";
import { config } from "dotenv";
import cli from "./cli";

config({ path: ".env" });
cli().then(({ f, p }) => {
  const configFile = f || process.env.CONFIG_FILE || "";
  const port = p || (process.env?.PORT ? parseInt(process.env.PORT) : 3000);

  init(configFile, port).catch((error) => console.log(error));
});

export * from "./app";
