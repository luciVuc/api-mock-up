export class ServiceError extends Error implements IServiceError {
  public code?: string;
  public stack?: string;
  public readonly name: string = "ServiceError";

  constructor({ message, code, stack }: IServiceError) {
    super(message);
    this.message = message;
    this.code = code;
    this.stack = stack;
  }

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

export const serviceErrorSchema = ServiceError.SCHEMA;
export default ServiceError;
