import APIServiceEndPointRequest from "./APIServiceEndPointRequest";

export class APIServiceEndPoint implements IAPIServiceEndPoint {
  public request: string | IAPIServiceEndPointRequest = "";
  public response: APIServiceEndPointResponse = "";

  static get SCHEMA() {
    return {
      type: "object",
      properties: {
        request: {
          $ref: "#/$defs/APIServiceEndPointRequest",
        },
        response: {
          anyOf: [
            { type: "string" },
            { type: "number" },
            { type: "integer" },
            { type: "boolean" },
            { type: "object" },
            { type: "null" },
          ],
        },
      },
      required: ["request", "response"],
      $defs: {
        APIServiceEndPointRequest: APIServiceEndPointRequest.SCHEMA,
      },
    };
  }
}

export default APIServiceEndPoint;
