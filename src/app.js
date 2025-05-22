import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { pool } from "./config/db.js";

dotenv.config()


const app = express();

pool.connect()

app.use(cors());

app.get("/", (req, res) => {
    res.json({
        status: 200,
        message: "Application is working good"
    })
})


export default app