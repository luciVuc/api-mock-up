import APIServiceEndPoint from "./APIServiceEndPoint";
import APIServiceEndPointRequest from "./APIServiceEndPointRequest";
import APIServiceEndPointResponse from "./APIServiceEndPointResponse";
import APIServiceError from "./APIServiceError";

export class APIServiceConfiguration implements IAPIServiceConfiguration {
  public name: string;
  public endPoints: IAPIServiceEndPoint[];

  private constructor({ name, endPoints }: IAPIServiceConfiguration) {
    this.name = name;
    this.endPoints = endPoints;
  }

  static async create({ name, endPoints }: IAPIServiceConfiguration) {
    const promises = endPoints.reduce((arr, endPoint) => {
      arr.push(APIServiceEndPoint.create(endPoint));
      return arr;
    }, [] as Promise<IAPIServiceEndPoint>[]);

    endPoints = await Promise.all(promises)
    return new APIServiceConfiguration({ name, endPoints });
  }

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
        APIServiceEndPointResponse: APIServiceEndPointResponse.SCHEMA,
        APIServiceEndPoint: APIServiceEndPoint.SCHEMA,
        APIServiceError: APIServiceError.SCHEMA,
      },
    };
  }
}
export default APIServiceConfiguration;
