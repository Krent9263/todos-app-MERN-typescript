import { Router } from "express";
import { createTodo } from "../controllers/todoControllers";
import { authenticateToken, authorizeAdmin } from '../middleware/auth';

const router = Router();

// Route to create a new todo
/**
 * @openapi
 * /api/todos:
 *   post:
 *     summary: Create a new Todo
 *     description: Creates a new Todo for a user
 *     tags: [Todo]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *             properties:
 *               userId:
 *                 type: string
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               completed:
 *                 type: boolean
 *    
 *     responses:
 *       201:
 *         description: Todo created successfully
 *       400:
 *         description: Invalid request
 */

router.post('/todos', authenticateToken, authorizeAdmin , createTodo);

export default router;
