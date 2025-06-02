import pool from "../config/db.js";

export const createTodo = async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({
      success: false,
      message: "Title is required",
    });
  }

  try {
    const { rows } = await pool.query(
      "INSERT INTO todos (title) VALUES ($1) RETURNING *",
      [title]
    );
    res.status(201).json({
      success: true,
      message: "Todo Created Succesfully",
      data: rows[0],
      timestamps: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error creating todo:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
