declare interface IServiceError {
  message: string;
  code?: string;
  stack?: string;
}

declare interface IServiceEndPointRequest {
  path: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  queryParams?: Record<string, string | number | boolean>;
  headers?: Record<string, string | number | boolean>;
  body?: Record<string, string | number | boolean>;
}

declare type TServiceEndPointResponseRef = {
  $ref: string;
};

declare type TServiceEndPointResponse =
  | Record<string, string | number | boolean | object | null | any[]>
  | any[]
  | string
  | number
  | boolean
  | object
  | null;

declare interface IServiceEndPointResponse {
  payload: TServiceEndPointResponseRef | TServiceEndPointResponse;
}

declare class IServiceEndPoint {
  public request: string | IServiceEndPointRequest;
  public response: APIServiceEndPointResponse;
}

declare interface IServiceConfiguration {
  name: string;
  description?: string;
  endPoints: IServiceEndPoint[];
}
