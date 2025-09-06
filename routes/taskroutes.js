import express from "express";
import { getTask,addTask,deleteTask,clearTodo, updateTodo,getTaskById } from "../controllers/taskcontroller.js";
const router = express.Router();
router.get('/',getTask);
router.get('/:id', (req, res, next) => {
  if (isNaN(req.params.id)) {
    return res.status(400).json({ message: "Task ID must be a number" });
  }
  next();
}, getTaskById);

router.post('/',addTask);
router.delete('/:id',deleteTask);
router.delete('/',clearTodo);
router.patch('/:id',updateTodo);
export default router;