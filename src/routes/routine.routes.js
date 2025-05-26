import express from "express"
import { createNewRoutine, getAllRoutines } from "../controllers/routine.controller.js"

const router = express.Router();

router.get("/", getAllRoutines)
router.post("/", createNewRoutine)

export default router