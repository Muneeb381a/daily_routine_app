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


export const createNames = async(req, res) => {
    const {name} = req.body;

    if(!name) {
        return res.status(500).json({
            success: false,
            message: "Name is required",
            timestamps: new Date().toISOString()
        })
    }



    try {

        // check for duplicate name

        const checkingName = await pool.query('SELECT * FROM names WHERE name = $1', [name]);

        if(checkingName.rows.length > 0) {
            res.status(409).json({
                success: false,
                message: "Name already exists in db",
                timestamps: new Date().toISOString()
            })
        }

        const response = await pool.query('INSERT INTO names(name) VALUES ($1) RETURNING *', [name]);
        res.status(201).json({
            success: true,
            message: "Name Created Sucesfully",
            data: response.rows[0],
            timestamps: new Date().toISOString()
        })
    } catch (error) {
        console.error("Error creaitng names");
        res.status(500).json({
            success: false,
            message: "Error occured while creating name",
            timestamps: new Date().toISOString()
        })
    }
}