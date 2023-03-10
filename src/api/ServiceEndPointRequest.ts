export class ServiceEndPointRequest implements IServiceEndPointRequest {
  public path: string;
  public method: "GET" | "PATCH" | "POST" | "PUT" | "DELETE";
  public queryParams?: Record<string, string | number | boolean>;
  public headers?: Record<string, string | number | boolean>;
  public body?: Record<string, string | number | boolean>;

  private constructor({
    path,
    queryParams,
    headers,
    body,
    method,
  }: IServiceEndPointRequest) {
    this.path = path;
    this.queryParams = queryParams;
    this.headers = headers;
    this.body = body;
    this.method = method || "GET";
  }

  static async create(props: IServiceEndPointRequest) {
    return new ServiceEndPointRequest(props);
  }

  static get SCHEMA() {
    return {
      type: "object",
      properties: {
        path: {
          type: "string",
        },
        method: {
          type: "string",
          enum: ["GET", "PATCH", "POST", "PUT", "DELETE"],
        },
        queryParams: {
          type: "object",
        },
        headers: {
          type: "object",
        },
        body: {
          type: "object",
        },
      },
      required: ["path"],
    };
  }
}

export const serviceEndPointRequestSchema = ServiceEndPointRequest.SCHEMA;
export const createServiceEndPointRequest = ServiceEndPointRequest.create;
export default ServiceEndPointRequest;
