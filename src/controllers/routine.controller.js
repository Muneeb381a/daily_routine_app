import { pool } from "../config/db.js";

export const getAllRoutines = async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM routine ORDER BY date ASC"
    );
    res.status(200).json({
      success: true,
      message: "All routines fetched succesfully",
      count: rows.length,
      timestamp: new Date().toISOString(),
      data: rows,
    });
  } catch (err) {
    console.error("Error occured while getting routines", err);
    res.status(400).json({
      success: false,
      message: "Error occured while retriving data",
      timestamp: new Date().toISOString(),
    });
  }
};


export const createNewRoutine = async(req, res) => {
    const {title, description, date} = req.body


    if(!title || !description || !date) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        })
    }

    try {
        const {rows} = await pool.query('INSERT INTO routine(title, description, date) VALUES($1, $2, $3) RETURNING *',
            [title, description, date]
        )
        res.status(201).json({
            success: true,
            message: "Routine Created Succesfully",
            data: rows[0],
            timestamp: new Date().toISOString()
        })
    } catch (err) {
        console.error("Error while creating the routine", err);
        res.status(400).json({
            success: false,
            message: "Error While creating routine",
            timestamp: new Date().toISOString()
        })
    }
}