import type, { Request, Response } from 'express';
import Todo, { ITodo } from '../models/Todos';

// Create Todo handler
export const createTodo = async (req: Request, res: Response) => {
  try {
    const { userId, title, description } = req.body;

    if (!userId || !title) {
      return res.status(400).json({ message: 'User ID and title are required' });
    }

    const newTodo: ITodo = new Todo({
      userId,
      title,
      description,
      completed: false
    });
    await newTodo.save();
    return res.status(201).json({ message: 'Todo created successfully', todo: newTodo });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// get all todos handler
export const getAllTodos = async (req: Request, res: Response) => {
  try {
    const todos = await Todo.find();
    return res.status(200).json({ todos });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// update todo by id handler
export const updateTodoById = async (req: Request, res: Response) => {
  const todoId = req.params.id;
  const { userId, title, description, completed } = req.body;

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      todoId,
      { userId, title, description, completed },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    return res.status(200).json({ message: 'Todo updated successfully', todo: updatedTodo });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// update todo completed status handler
export const updateTodoCompletedStatus = async (req: Request, res: Response) => {
  const todoId = req.params.id;
  const { completed } = req.body;

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      todoId,
      { completed },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    return res.status(200).json({ message: 'Todo updated successfully', todo: updatedTodo });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// delete todo by id handler
export const deleteTodoById = async (req: Request, res: Response) => {
  const todoId = req.params.id;

  try {
    const deletedTodo = await Todo.findByIdAndDelete(todoId);

    if (!deletedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    return res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// get todo by userId handler
export const getTodosByUserId = async (req: Request, res: Response) => {
  const userId = req.params.userId;

  try {
    const todos = await Todo.find({ userId });

    if (todos.length === 0) {
      return res.status(404).json({ message: 'No todos found for this user' });
    }

    return res.status(200).json({ todos });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export default { createTodo, getAllTodos, updateTodoById, updateTodoCompletedStatus, deleteTodoById, getTodosByUserId };
