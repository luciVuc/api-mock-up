import Ajv from "ajv";
import { readFile } from "fs";
import APIServiceConfiguration from "./APIServiceConfiguration";

const ajv = new Ajv();
const SVC_CONFIG_SCHEMA = APIServiceConfiguration.SCHEMA;

export async function getServiceConfiguration(filename: string) {
  return new Promise<APIServiceConfiguration | Error>((resolve, reject) => {
    readFile(filename, "utf8", (error, fileContent) => {
      if (error) {
        return reject(error as Error);
      }

      const data = JSON.parse(fileContent);
      const validate = ajv.compile<APIServiceConfiguration>(SVC_CONFIG_SCHEMA);

      if (!validate(data)) {
        return reject(
          new Error(JSON.stringify({ validationErrors: validate.errors }))
        );
      }
      return resolve(data as APIServiceConfiguration);
    });
  });
}
export default { getServiceConfiguration };
