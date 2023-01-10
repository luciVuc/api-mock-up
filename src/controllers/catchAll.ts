import { Response, Request } from "express";
import asyncHandler from "express-async-handler";

export const catchAll = asyncHandler(async (req: Request, res: Response) => {
  const action = "GET_DATA";
  const status = 404;

  res.status(status);
  res.json({
    action,
    payload: { error: `${action}: Resource not found` },
    status,
  });
});

export default { catchAll };
