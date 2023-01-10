import "colors";
import yargs from "yargs";

export const cli = async () => {
  const argv = await yargs
    .usage("Usage: $0 [options]")
    .option("f", {
      alias: "configFile",
      describe:
        "The path to the API Configuration file",
      type: "string",
      demandOption: true,
      example: "$0 configFile ../../../mockAPI.json",
    })
    .option("p", {
      alias: "port",
      describe: "The port on which the server will listen for API requests",
      default: 3000,
      type: "number",
      demandOption: false,
      example: "$0 configFile ../../../mockAPI.json",
    })
    .help(true).argv;

  return argv;
};
export default cli;
