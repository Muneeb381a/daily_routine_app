import { pool } from "../config/db.js";

export const getAllNames = async(req, res) => {

    try {
        const result = await pool.query('SELECT * FROM names ORDER BY name ASC');
    res.status(200).json({
        success: true,
        message: "All names fetched succefully",
        data: result.rows[0],
        timestamps: new Date().toISOString()
    })
    } catch (error) {
        console.error("Error while fetching all the names")
        res.status(400).json({
            success: false,
            message: "Getting Error while getting all the names",
            timestamps: new Date().toISOString()
        })
    }
    
}