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

export const getTodo = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM todos ORDER BY id*");
    res.status(200).json({
      success: true,
      message: "All Todos fetched succesfully",
      data: rows,
    });
  } catch (error) {
    console.error("Error while fething all the todos");
    res.status(500).json({
      success: false,
      message: " Failed to fetch todos",
    });
  }
};

export const updateTodos = async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  try {
    const { rows } = await pool.query(
      "UPDATE todos SET completed = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *",
      [completed, id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Todo updated successfully",
      data: rows[0],
    });
  } catch (error) {
    console.error("Error while updating the todo:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update the todo",
    });
  }
};

export const deleteTodos = async (req, res) => {
  const { id } = req.params;

  try {
    const { rows } = await pool.query(
      "DELETE FROM todos WHERE id = $1 RETURNING *",
      [id]
    );
    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Todos deleted succesfully",
      data: rows[0],
    });
  } catch (error) {
    console.error("Error while deleting the Todos");
    res.status(500).json({
      success: false,
      message: "Unable to delete the todos",
    });
  }
};
