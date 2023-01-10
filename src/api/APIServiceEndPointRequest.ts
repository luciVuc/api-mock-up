export class APIServiceEndPointRequest implements IAPIServiceEndPointRequest {
  public path: string = "";
  public queryParams?: Record<string, string | number | boolean>;
  public headers?: Record<string, string | number | boolean>;
  public body?: Record<string, string | number | boolean>;
  public method: "GET" | "POST" | "PUT" | "DELETE" = "GET";

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
