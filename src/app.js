import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config()


const app = express()

app.use(cors());

app.get("/", (req, res) => {
    res.json({
        status: 200,
        message: "Application is working good"
    })
})


export default app