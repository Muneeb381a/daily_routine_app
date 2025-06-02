import express from "express";
import { createTodo, getTodo, updateTodos, deleteTodos } from "../controllers/todos.controller.js";

const router = express.Router();

router.get("/", getTodo);
router.post("/", createTodo);
router.put("/:id", updateTodos);
router.delete("/:id", deleteTodos);


export default router;