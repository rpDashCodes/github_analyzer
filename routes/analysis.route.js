import { Router } from "express";
import { queryAnalysis } from "../controller/getanalysis.controller.js";
const router = Router();

router.get("/", queryAnalysis);

export default router;