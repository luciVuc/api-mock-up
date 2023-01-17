import { readFileSync, stat } from "fs";
import axios from "axios";
import { join, isAbsolute } from "path";

export class APIServiceEndPointResponse implements IAPIServiceEndPointResponse {
  public payload: TAPIServiceEndPointResponse;

  static async fetchRef(
    { $ref }: TAPIServiceEndPointResponseRef,
    action: string
  ) {
    let payload = null;

    try {
      let { status, data } = await axios.get($ref);
      if (status === 200) {
        payload = JSON.parse(JSON.stringify(data)) || payload;
      } else {
        payload = data.error || payload;
      }
    } catch (error) {
      try {
        if (!isAbsolute($ref)) {
          $ref = join(process.cwd(), $ref);
        }
        payload = JSON.parse(readFileSync($ref).toString()) || payload;
      } catch (error) {
        payload = { error: `${action}: ${(error as any).message}` };
      }
    }
    return payload;
  }

  private constructor({ payload }: IAPIServiceEndPointResponse) {
    this.payload = payload;
  }

  static async create({ payload }: IAPIServiceEndPointResponse) {
    if ((payload as TAPIServiceEndPointResponseRef)?.$ref) {
      payload = await APIServiceEndPointResponse.fetchRef(
        payload as TAPIServiceEndPointResponseRef,
        "GET"
      );
    } else if (payload instanceof Array) {
      const promises = payload.reduce((arr: any[], item, i) => {
        if ((item as TAPIServiceEndPointResponseRef)?.$ref) {
          arr.push(
            APIServiceEndPointResponse.fetchRef(
              item as TAPIServiceEndPointResponseRef,
              "GET"
            )
          );
        } else {
          arr.push(item);
        }
        return arr;
      }, [] as any[]);
      payload = await Promise.all(promises);
    } else if (typeof payload !== "undefined") {
      payload = payload;
    }

    return new APIServiceEndPointResponse({ payload });
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

export default APIServiceEndPointResponse;
