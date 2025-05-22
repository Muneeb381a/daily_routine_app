import express from "express";
import { getDailyRoutine } from "../controllers/daily_routine.controllers.js";

const router = express.Router();

router.get("/", getDailyRoutine);

export default router;