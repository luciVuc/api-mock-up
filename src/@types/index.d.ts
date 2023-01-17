declare interface IAPIServiceError {
  message: string;
  code?: string;
  stack?: string;
}

declare interface IAPIServiceEndPointRequest {
  path: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  queryParams?: Record<string, string | number | boolean>;
  headers?: Record<string, string | number | boolean>;
  body?: Record<string, string | number | boolean>;
}

declare type TAPIServiceEndPointResponseRef = {
  $ref: string;
};

declare type TAPIServiceEndPointResponse =
  | Record<string, string | number | boolean | object | null | any[]>
  | any[]
  | string
  | number
  | boolean
  | object
  | null;

declare interface IAPIServiceEndPointResponse {
  payload: TAPIServiceEndPointResponseRef | TAPIServiceEndPointResponse;
}

declare class IAPIServiceEndPoint {
  public request: string | IAPIServiceEndPointRequest;
  public response: APIServiceEndPointResponse;
}

declare interface IAPIServiceConfiguration {
  name: string;
  endPoints: IAPIServiceEndPoint[];
}
