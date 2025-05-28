import express from "express";
import { createNames, getAllNames } from "../controllers/names.controller.js";


const router = express.Router();

router.get("/", getAllNames);
router.post("/", createNames)


export default router