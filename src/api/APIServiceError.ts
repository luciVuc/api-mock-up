export class APIServiceError implements IAPIServiceError {
  public message: string = "";
  public code?: string;
  public stack?: string;

  static get SCHEMA() {
    return {
      type: "object",
      properties: {
        message: {
          type: "string",
        },
        code: {
          type: "string",
        },
        stack: {
          type: "string",
        },
      },
      required: ["message"],
    };
  }
}

export default APIServiceError;
