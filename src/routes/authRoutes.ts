import { Router } from "express";
import { registerUser, loginUser, getUserById, getAllUsers } from "../controllers/authControllers";
import { authenticateToken, authorizeAdmin } from '../middleware/auth';

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
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
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
 *     summary: Get user by id
 *     description: Retrieves the user information by id
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

export default router;