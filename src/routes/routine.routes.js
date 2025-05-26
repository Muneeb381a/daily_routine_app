import express from "express"
import { getAllRoutines } from "../controllers/routine.controller.js"

const router = express.Router();

router.get("/", getAllRoutines)

export default router