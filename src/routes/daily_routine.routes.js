import express from "express";
import { createDailyRoutine, getDailyRoutine, updateDailyRoutine } from "../controllers/daily_routine.controllers.js";

const router = express.Router();

router.get("/", getDailyRoutine);
router.post("/", createDailyRoutine);
router.put("/:id", updateDailyRoutine)

export default router;