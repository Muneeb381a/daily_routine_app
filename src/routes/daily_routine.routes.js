import express from "express";
import { createDailyRoutine, getDailyRoutine } from "../controllers/daily_routine.controllers.js";

const router = express.Router();

router.get("/", getDailyRoutine);
router.post("/", createDailyRoutine);

export default router;