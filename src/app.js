import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { pool } from "./config/db.js";

dotenv.config()


const app = express();

pool.connect();



app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        status: 200,
        message: "Application is working good"
    })
})




import routine from "./routes/daily_routine.routes.js";

app.use("/v1/api/routine", routine)


export default app