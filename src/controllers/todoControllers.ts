import type { Request, Response } from 'express';
import Todo, { ITodo } from '../models/Todos';
import User from '../models/Users';

// Create Todo handler
export const createTodo = async (req: Request, res: Response) => {
  try {
    const { userId, title, description } = req.body;
    const user = await User.findById(userId).select('-password');

    if (!userId || !title) {
      return res.status(400).json({ message: 'User ID and title are required' });
    }

    const newTodo: ITodo = new Todo({
      userId: user?._id,
      fullname: user?.fullname,
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
    const todos = (await Todo.find());
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

// add like to todo handler
export const addLikeToTodo = async (req: Request, res: Response) => {
  const todoId = req.params.id;
  const { userId } = req.body;
  const user = await User.findById(userId).select('-password');

  try {
    const todo = await Todo.findById(todoId);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    // Check if the user has already liked the todo
    const alreadyLiked = todo.likes?.some(like => like.user?.toString() === userId);
    if (alreadyLiked) {
      return res.status(400).json({ message: 'User has already liked this todo' });
    }

    // Add the like (we already checked `todo` is non-null above)
    const likes = (todo.likes as any[]) || [];
    likes.push({ 
      user: userId, 
      fullname: user?.fullname, 
      createdAt: new Date() 
    });
    todo.likes = likes;
    await todo.save();

    return res.status(200).json({ message: 'Like added successfully', todo });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// add comment to todo handler
export const addCommentToTodo = async (req: Request, res: Response) => {
  const todoId = req.params.id;
  const { userId, text } = req.body;
  const user = await User.findById(userId).select('-password');

  try {
    const todo = await Todo.findById(todoId);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    const comments = todo.comments || [];
    comments.push({ 
      userId, 
      fullname: user?.fullname, 
      text, 
      createdAt: new Date() 
    });
    todo.comments = comments;
    await todo.save();

    return res.status(200).json({ message: 'Comment added successfully', todo });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// delete comment from todo handler
export const deleteCommentFromTodo = async (req: Request, res: Response) => {
  const todoId = req.params.id;
  const commentId = req.params.commentId;
  const { userId } = req.body;

  const user = await User.findById(userId).select('-password');

  try {
    const todo = await Todo.findById(todoId);
    
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    if(user?._id != userId)
    {
      return res.status(403).json({ message: 'Unauthorized to delete this comment' });
    }

    todo.comments = todo.comments?.filter(comment => (comment?._id?.toString() ?? '') !== commentId);
    await todo.save();

    return res.status(200).json({ message: 'Comment deleted successfully', todo });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// unlike todo handler (optional)
export const unlikeTodo = async (req: Request, res: Response) => {
  const todoId = req.params.id;
  const { userId } = req.body;

  const user = await User.findById(userId).select('-password');

  try {
    const todo = await Todo.findById(todoId);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    // Check if the user has liked the todo
    const likeIndex = todo.likes?.findIndex(like => like.user?.toString() === userId) ?? -1;
    if (likeIndex === -1) {
      return res.status(400).json({ message: 'User has not liked this todo' });
    }

    if(user?._id != userId)
    {
      return res.status(403).json({ message: 'Unauthorized to unlike this todo' });
    }

    // Remove the like
    todo.likes?.splice(likeIndex, 1);
    await todo.save();

    return res.status(200).json({ message: 'Like removed successfully', todo });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export default { 
  createTodo, 
  getAllTodos, 
  updateTodoById, 
  updateTodoCompletedStatus, 
  deleteTodoById, 
  getTodosByUserId, 
  addLikeToTodo, 
  addCommentToTodo,
  deleteCommentFromTodo,
  unlikeTodo
};
