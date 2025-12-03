import e, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/Users';
import { authorizeAdmin } from '../middleware/auth';

// User registration handler
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, isAdmin } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    if(!name || !email || !password){
      return  res.status(400).json({ message: 'Name, email and password are required' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser: IUser = new User({
      name,
      email,
      password: hashedPassword,
      isAdmin: false,
    });

    const token = jwt.sign(
      { userId: newUser._id, isAdmin: newUser.isAdmin },
      process.env.JWT_SECRET || 'defaultsecret',
      { expiresIn: '7d' }
    );

    // Save user to database  
    await newUser.save();
    return res.status(201).json({ token, user: { id: newUser._id, name: newUser.name, email: newUser.email, isAdmin: newUser.isAdmin } });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// User login handler
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as { email: string; password: string };

    // Validate input
    if(!email || !password){
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password || '');
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET || 'defaultsecret',
      { expiresIn: '1h' }
    );

    res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin } });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get user by id profile handler
export const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    // Find user by ID
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// get all users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export default { registerUser, loginUser, getUserById, getAllUsers };