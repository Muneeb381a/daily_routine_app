import express from "express";
import { getAllNames } from "../controllers/names.controller.js";


const router = express.Router();

router.get("/", getAllNames)


export default router