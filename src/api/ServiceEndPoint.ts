import {
  createServiceEndPointRequest,
  serviceEndPointRequestSchema,
} from "./ServiceEndPointRequest";
import {
  createServiceEndPointResponse,
  serviceEndPointResponseSchema,
} from "./ServiceEndPointResponse";

export class ServiceEndPoint implements IServiceEndPoint {
  public request: string | IServiceEndPointRequest;
  public response: IServiceEndPointResponse;

  private constructor({ request, response }: IServiceEndPoint) {
    this.request = request;
    this.response = response;
  }

  static async create({ request, response }: IServiceEndPoint) {
    return new ServiceEndPoint({
      request: await createServiceEndPointRequest(
        typeof request === "string"
          ? {
              path: request,
              method: "GET",
            }
          : request
      ),
      response: await createServiceEndPointResponse(response),
    });
  }

  static get SCHEMA() {
    return {
      type: "object",
      properties: {
        request: {
          $ref: "#/$defs/ServiceEndPointRequest",
        },
        response: {
          $ref: "#/$defs/ServiceEndPointResponse",
        },
      },
      required: ["request", "response"],
      $defs: {
        ServiceEndPointRequest: serviceEndPointRequestSchema,
        ServiceEndPointResponse: serviceEndPointResponseSchema,
      },
    };
  }
}

export const serviceEndPointSchema = ServiceEndPoint.SCHEMA;
export const createServiceEndPoint = ServiceEndPoint.create;
export default ServiceEndPoint;
