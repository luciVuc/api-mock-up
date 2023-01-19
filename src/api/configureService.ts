import Ajv from "ajv";
import { readFile } from "fs";
import YAML from "yamljs";
import {
  ServiceConfiguration,
  createServiceConfiguration,
  serviceConfigurationSchema,
} from "./ServiceConfiguration";
import { ServiceError } from "./ServiceError";

const ajv = new Ajv();
const SVC_CONFIG_SCHEMA = serviceConfigurationSchema;

export async function configureService(filename: string) {
  return new Promise<ServiceConfiguration | Error>((resolve, reject) => {
    readFile(filename, "utf8", async (error, fileContent) => {
      if (error) {
        return reject(error as Error);
      }

      let data;
      try {
        data = YAML.parse(fileContent);
      } catch (error) {
        try {
          data = JSON.parse(fileContent);
        } catch (error) {
          return reject(error as Error)
        }
      }

      const validate = ajv.compile<ServiceConfiguration>(SVC_CONFIG_SCHEMA);

      if (!validate(data)) {
        return reject(
          new ServiceError({
            message: JSON.stringify({ validationErrors: validate.errors }),
            code: "SERVICE_CONFIGURATION_ERROR",
          })
        );
      }
      const svcConfig = await createServiceConfiguration(data);
      return resolve(svcConfig);  
    });
  });
}
export default { configureService };
