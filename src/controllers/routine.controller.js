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
      date: new Date().toISOString(),
      data: rows,
    });
  } catch (err) {
    console.error("Error occured while getting routines", err);
    res.status(400).json({
      success: false,
      message: "Error occured while retriving data",
      date: new Date().toISOString(),
    });
  }
};
