import express from "express";
import { createDailyRoutine, deleteDailyRoutine, getDailyRoutine, updateDailyRoutine } from "../controllers/daily_routine.controllers.js";

const router = express.Router();

router.get("/", getDailyRoutine);
router.post("/", createDailyRoutine);
router.put("/:id", updateDailyRoutine);
router.delete("/:id", deleteDailyRoutine);

export default router;