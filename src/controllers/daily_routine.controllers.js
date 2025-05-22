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


export {getDailyRoutine};