import {
  createServiceEndPoint,
  serviceEndPointSchema,
} from "./ServiceEndPoint";
import { serviceEndPointRequestSchema } from "./ServiceEndPointRequest";
import { serviceEndPointResponseSchema } from "./ServiceEndPointResponse";
import { ServiceError, serviceErrorSchema } from "./ServiceError";

export class ServiceConfiguration implements IServiceConfiguration {
  public name: string;
  public description?: string;
  public endPoints: IServiceEndPoint[];

  private constructor({ name, description, endPoints }: IServiceConfiguration) {
    this.name = name;
    this.description = description;
    this.endPoints = endPoints;
  }

  static async create({ name, description, endPoints }: IServiceConfiguration) {
    const promises = endPoints.reduce((arr, endPoint) => {
      arr.push(createServiceEndPoint(endPoint));
      return arr;
    }, [] as Promise<IServiceEndPoint>[]);

    try {
      return new ServiceConfiguration({
        name,
        description,
        endPoints: await Promise.all(promises),
      });
    } catch (error) {
      return new ServiceError({
        message: error as string,
        code: "SERVICE_CONFIGURATION_ERROR",
      });
    }
  }

  static get SCHEMA() {
    return {
      $schema: "http://json-schema.org/draft-07/schema#",
      type: "object",
      properties: {
        name: {
          type: "string",
        },
        description: {
          type: "string",
        },
        endPoints: {
          type: "array",
          uniqueItems: true,
          items: {
            $ref: "#/$defs/ServiceEndPoint",
          },
        },
      },
      required: ["name", "endPoints"],
      $defs: {
        ServiceEndPointRequest: serviceEndPointRequestSchema,
        ServiceEndPointResponse: serviceEndPointResponseSchema,
        ServiceEndPoint: serviceEndPointSchema,
        ServiceError: serviceErrorSchema,
      },
    };
  }
}

export default ServiceConfiguration;
export const serviceConfigurationSchema = ServiceConfiguration.SCHEMA;
export const createServiceConfiguration = ServiceConfiguration.create;
