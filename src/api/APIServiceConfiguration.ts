import APIServiceEndPoint from "./APIServiceEndPoint";
import APIServiceEndPointRequest from "./APIServiceEndPointRequest";
import APIServiceError from "./APIServiceError";

export class APIServiceConfiguration implements IAPIServiceConfiguration {
  public name: string = "";
  public endPoints: IAPIServiceEndPoint[] = [];

  static get SCHEMA() {
    return {
      $schema: "http://json-schema.org/draft-07/schema#",
      type: "object",
      properties: {
        name: {
          type: "string",
        },
        endPoints: {
          type: "array",
          uniqueItems: true,
          items: {
            $ref: "#/$defs/APIServiceEndPoint",
          },
        },
      },
      required: ["name", "endPoints"],
      $defs: {
        APIServiceEndPointRequest: APIServiceEndPointRequest.SCHEMA,
        APIServiceEndPoint: APIServiceEndPoint.SCHEMA,
        APIServiceError: APIServiceError.SCHEMA,
      },
    };
  }
}
export default APIServiceConfiguration;
