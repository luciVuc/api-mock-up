import { Router } from "express";
import { ping } from "../controllers";

const router: Router = Router();

router.route("/ping").get(ping);

export default router;
