import { pool } from "../config/db.js";


const getDailyRoutine =async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM daily_routine'
        )
        res.status(200).json(result.rows)
    } catch (error) {
        throw new Error("Error while getting all the daily routine")
    }
}

const createDailyRoutine = async(req, res) => {
    const {title} = req.body;

    if(!title) {
        res.status(500).json({message: "Title field is required"})
    }

    try {
        const result = await pool.query(
            'INSERT INTO daily_routine (title) VALUES ($1) RETURNING *',
            [title]
        )

        res.status(201).json({
            status: 201,
            message: "Daily Routine Created Succesfully",
            data: result.rows[0]
        })
    } catch (error) {
        console.error("Error inserting title")
        throw new Error("Unable to create daily routine")
    }
}


export {getDailyRoutine, createDailyRoutine};