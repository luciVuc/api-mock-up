import { fetchRef } from "../utils";

export class ServiceEndPointResponse implements IServiceEndPointResponse {
  public payload: TServiceEndPointResponse;

  private constructor({ payload }: IServiceEndPointResponse) {
    this.payload = payload;
  }

  static async create({ payload }: IServiceEndPointResponse) {
    if ((payload as TServiceEndPointResponseRef)?.$ref) {
      payload = await fetchRef(payload as TServiceEndPointResponseRef);
    } else if (payload instanceof Array) {
      const promises = payload.reduce((arr: any[], item, i) => {
        if ((item as TServiceEndPointResponseRef)?.$ref) {
          arr.push(fetchRef(item as TServiceEndPointResponseRef));
        } else {
          arr.push(item);
        }
        return arr;
      }, [] as any[]);
      payload = await Promise.all(promises);
    } else if (typeof payload !== "undefined") {
      payload = payload;
    }

    return new ServiceEndPointResponse({ payload });
  }

  static get SCHEMA() {
    return {
      type: "object",
      properties: {
        payload: {
          anyOf: [
            { type: "array" },
            { type: "string" },
            { type: "number" },
            { type: "integer" },
            { type: "boolean" },
            { type: "object" },
            { type: "null" },
          ],
        },
      },
      required: ["payload"],
    };
  }
}

export const serviceEndPointResponseSchema = ServiceEndPointResponse.SCHEMA;
export const createServiceEndPointResponse = ServiceEndPointResponse.create;
export default ServiceEndPointResponse;
