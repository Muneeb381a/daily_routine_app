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
    const {title, name} = req.body;

    if(!title || !name) {
        res.status(500).json({message: "Title field is required"})
    }

    try {
        const result = await pool.query(
            'INSERT INTO daily_routine (title, name) VALUES ($1, $2) RETURNING *',
            [title, name]
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
};

const updateDailyRoutine = async(req, res) => {
    const {id} = req.params
    const {title} = req.body

    try {
        const result = await pool.query(
            'UPDATE daily_routine SET title = $1 WHERE  id= $2 RETURNING *',
            [title, id]
        )
        if(result.rowCount === 0) {
            res.status(500).json("Title is not found")
        }

        res.status(200).json({
            status: 200,
            message: "Title updated Sccesfully",
            data: result.rows[0]
        })
    } catch (error) {
        console.error("Error while updating title", error);
        throw new Error("Umable to update the daily routine")
    }
}

const deleteDailyRoutine = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            'DELETE FROM daily_routine WHERE id = $1 RETURNING *',
            [id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "There is no daily routine to delete" });
        }

        res.status(200).json({
            status: 200,
            message: "Daily routine deleted successfully",
            data: result.rows[0]
        });
    } catch (error) {
        console.error("Error while deleting the daily routine:", error);
        res.status(500).json({ message: "Unable to delete daily routine" });
    }
};



export {getDailyRoutine, createDailyRoutine, updateDailyRoutine, deleteDailyRoutine};