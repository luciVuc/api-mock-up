import APIServiceEndPointRequest from "./APIServiceEndPointRequest";
import APIServiceEndPointResponse from "./APIServiceEndPointResponse";

export class APIServiceEndPoint implements IAPIServiceEndPoint {
  public request: string | IAPIServiceEndPointRequest;
  public response: IAPIServiceEndPointResponse;

  private constructor({ request, response }: IAPIServiceEndPoint) {
    this.request = request;
    this.response = response
  }

  static async create({ request, response }: IAPIServiceEndPoint) {
    request = await APIServiceEndPointRequest.create(typeof request === "string" ? {
      path: request,
      method: "GET"
    } : request);
    response = await APIServiceEndPointResponse.create(response);

    return new APIServiceEndPoint({ request, response });
  }

  static get SCHEMA() {
    return {
      type: "object",
      properties: {
        request: {
          $ref: "#/$defs/APIServiceEndPointRequest",
        },
        response: {
          $ref: "#/$defs/APIServiceEndPointResponse",
        },
      },
      required: ["request", "response"],
      $defs: {
        APIServiceEndPointRequest: APIServiceEndPointRequest.SCHEMA,
        APIServiceEndPointResponse: APIServiceEndPointResponse.SCHEMA
      },
    };
  }
}

export default APIServiceEndPoint;
