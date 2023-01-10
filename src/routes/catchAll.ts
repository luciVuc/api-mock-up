import { Router } from "express";
import { catchAll } from "../controllers";

const router: Router = Router();

router.route("/*").get(catchAll);

export default router;
