import { Response, Request } from "express";
import asyncHandler from "express-async-handler";

export const apiConfig = async (response: IServiceEndPointResponse) => {
  return asyncHandler(async (req: Request, res: Response) => {
    const action = "DATA";
    const status = 200;

    res.status(status);
    res.json({
      action,
      payload: response,
      status,
    });
  });
};
export default { apiConfig };
