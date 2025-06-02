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
import allRoutine from "./routes/routine.routes.js";
import nameRoutes from "./routes/names.routes.js"
import todoRoutes from "./routes/todo.routes.js"

app.use("/v1/api/routine", routine)
app.use("/v1/api/all-routines", allRoutine)
app.use("/v1/api/names", nameRoutes)
app.use("/v1/api/todo", todoRoutes)


export default app