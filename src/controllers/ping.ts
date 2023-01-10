import { Response, Request } from "express";
import asyncHandler from "express-async-handler";

export const ping = asyncHandler(async (req: Request, res: Response) => {
  const action = "PING";
  const status = 200;

  res.status(status);
  res.json({
    action,
    payload: { message: `${action}: PONG` },
    status,
  });
});

export default { ping };
