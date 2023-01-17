export class APIServiceEndPointRequest implements IAPIServiceEndPointRequest {
  public path: string;
  public method: "GET" | "POST" | "PUT" | "DELETE";
  public queryParams?: Record<string, string | number | boolean>;
  public headers?: Record<string, string | number | boolean>;
  public body?: Record<string, string | number | boolean>;

  private constructor({ path, queryParams, headers, body, method }: IAPIServiceEndPointRequest) {
    this.path = path;
    this.queryParams = queryParams;
    this.headers = headers;
    this.body = body;
    this.method = method || "GET";
  }

  static async create(props: IAPIServiceEndPointRequest) {
    return new APIServiceEndPointRequest(props);
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
          enum: ["GET", "POST", "PUT", "DELETE"],
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

export default APIServiceEndPointRequest;
