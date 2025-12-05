import { Router } from "express";
import { registerUser, loginUser, getUserById, getAllUsers, deleteUserById, updateUserById, getUser } from "../controllers/authControllers";
import { authenticateToken, authorizeAdmin } from '../middleware/auth';
import User from "../models/Users";

const router = Router();

// Registration route
/**
 * @openapi
 * /api/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user in the system
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullname
 *               - email
 *               - password
 *             properties:
 *               fullname:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *               isAdmin:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid request
 */
router.post('/register', registerUser);

// Login route
/**
 * @openapi
 * /api/login:
 *   post:
 *     summary: Login a user
 *     description: Authenticates a user and returns a JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Invalid credentials
 */
router.post('/login', loginUser);

// Get user profile route
/**
 * @openapi
 * /api/user/{id}:
 *   get:
 *     summary: Get user by userId
 *     description: Retrieves the user information by userId
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: get User by id retrieved successfully
 *       404:
 *         description: User not found
 */
router.get('/user/:id', getUserById);

// get all users route
/**
 * @openapi
 * /api/users:
 *   get:
 *     summary: Get all users
 *     description: Retrieves a list of all users in the system
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: List of users retrieved successfully
 */
router.get('/users', authenticateToken, authorizeAdmin, getAllUsers);

// delete user 
/**
 * @openapi
 * /api/user/{id}/delete:
 *   delete:
 *     summary: Delete user by userId
 *     description: Deletes a user from the system by userId
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete('/user/:id/delete', authenticateToken, authorizeAdmin, deleteUserById);

// update user by id route
/**
 * @openapi
 * /api/user/{id}/update:
 *   put:
 *     summary: Update user by userId
 *     description: Updates a user's information by userId
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 */
router.put('/user/:id/update', authenticateToken, updateUserById);

// authenticated get user handler
/**
 * @openapi
 * /api/user:
 *   get:
 *     summary: Get authenticated user
 *     description: Retrieves the authenticated user's information
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Authenticated user retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get('/user', authenticateToken, getUser);  


export default router;