import { Router } from "express";
import { home } from "../controllers";

const router: Router = Router();

router.get("/", home);

export default router;
