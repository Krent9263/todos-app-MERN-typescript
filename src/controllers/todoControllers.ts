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

export default { createTodo };


