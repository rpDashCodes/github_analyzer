import { Router } from "express";
import gitHubAnalyze from "../controller/gitHubAnalyze.controller.js"
const router = Router();
router.get("/",gitHubAnalyze)

export default router;