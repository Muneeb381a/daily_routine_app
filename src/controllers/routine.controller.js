import { pool } from "../config/db.js";


// get all the routines

export const getAllRoutines = async (req, res) => {

    try {
        const {rows} = await pool.query('SELECT * FROM routine ORDER BY date ASC')
        res.status(200).json({
            success: true,
            message: "Data retrived Sucesfully",
            data: rows
        })
    } catch (err) {
        console.error("Error while getting all the routines", err)
        res.status(400).json({
            success: false,
            message: "Error while getting all the routines",
        })
    }
}