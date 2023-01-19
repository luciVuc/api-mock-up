import yargs from "yargs";

export const cli = async () => {
  const argv = await yargs
    .usage("Usage: $0 [options]")
    .option("f", {
      alias: "configFile",
      describe: "The path to the API Configuration file",
      type: "string",
      demandOption: true,
    })
    .option("p", {
      alias: "port",
      describe: "The port on which the server will listen for API requests",
      default: 3000,
      type: "number",
      demandOption: false,
    })
    .example([
      ["$0 --configFile ./test/mockAPI.json"],
      ["$0 --configFile ./test/mockAPI.json --port 1234"],
      ["$0 -f ./test/mockAPI.json"],
      ["$0 -f ./test/mockAPI.json -p 1234"],
      ["$0 --configFile ./test/mockAPI.yml"],
      ["$0 --configFile ./test/mockAPI.yml --port 1234"],
      ["$0 -f ./test/mockAPI.yml"],
      ["$0 -f ./test/mockAPI.yml -p 1234"],
    ])
    .alias("version", "v")
    .alias("help", "h")
    .help(true).argv;

  return argv;
};
export default cli;
