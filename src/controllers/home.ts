
import { Response, Request } from "express";
import asyncHandler from "express-async-handler";
import { resolve } from "path";

export const home = asyncHandler(async (request: Request, response: Response) => {
  return response
    .status(200)
    .sendFile(resolve(__dirname, "../public", "index.html"));
});
export default home;