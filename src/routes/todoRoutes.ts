import { Router } from "express";
import { createTodo, getAllTodos, updateTodoById, updateTodoCompletedStatus, deleteTodoById, getTodosByUserId, addLikeToTodo, addCommentToTodo, deleteCommentFromTodo, unlikeTodo } from "../controllers/todoControllers";
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

// get all todos route
/**
 * @openapi
 * /api/todos:
 *   get:
 *     summary: Get all Todos
 *     description: Retrieves a list of all Todos
 *     tags: [Todo]
 *     responses:
 *       200:
 *         description: A list of Todos
 *       500:
 *         description: Server error
 */

router.get('/todos', authenticateToken, authorizeAdmin, getAllTodos);

// update todo by id route 
/**
 * @openapi
 * /api/todos/{id}/update:
 *   put:
 *     summary: Update a Todo by ID
 *     description: Updates the details of a specific Todo by its ID
 *     tags: [Todo]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The Todo ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               completed:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Todo updated successfully
 *       404:
 *         description: Todo not found
 *       500:
 *         description: Server error
 */

 router.put('/todos/:id/update', authenticateToken, authorizeAdmin, updateTodoById);

 // update todo completed status route
/**
 * @openapi
 * /api/todos/{id}/complete:
 *   put:
 *     summary: Update Todo Completed Status
 *     description: Updates the completed status of a specific Todo by its ID
 *     tags: [Todo]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The Todo ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               completed:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Todo completed status updated successfully
 *       404:
 *         description: Todo not found
 *       500:
 *         description: Server error
 */

 router.put('/todos/:id/complete', authenticateToken, updateTodoCompletedStatus);

// delete todo by id route
/**
 * @openapi
 * /api/todos/{id}/delete:
 *   delete:
 *     summary: Delete a Todo by ID
 *     description: Deletes a specific Todo by its ID
 *     tags: [Todo]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The Todo ID
 *     responses:
 *       200:
 *         description: Todo deleted successfully
 *       404:
 *         description: Todo not found
 *       500:
 *         description: Server error
 */

 router.delete('/todos/:id/delete', authenticateToken, authorizeAdmin, deleteTodoById);

// get todos by userId route
/**
 * @openapi
 * /api/todos/user/{userId}:
 *   get:
 *     summary: Get Todos by User ID
 *     description: Retrieves a list of Todos for a specific user by their User ID
 *     tags: [Todo]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The User ID
 *     responses:
 *       200:
 *         description: A list of Todos for the user
 *       500:
 *         description: Server error
 */

 router.get('/todos/user/:userId', authenticateToken,  getTodosByUserId);

 // add like to todo route
/**
 * @openapi
 * /api/todos/{id}/like:
 *   post:
 *     summary: Add Like to Todo
 *     description: Adds a like to a specific Todo by its ID
 *     tags: [Todo]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The Todo ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Like added successfully
 *       404:
 *         description: Todo not found
 *       500:
 *         description: Server error
 */
router.post('/todos/:id/like', authenticateToken, addLikeToTodo);

// add comment to todo route
/**
 * @openapi
 * /api/todos/{id}/comment:
 *   post:
 *     summary: Add Comment to Todo
 *     description: Adds a comment to a specific Todo by its ID
 *     tags: [Todo]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The Todo ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               text:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comment added successfully
 *       404:
 *         description: Todo not found
 *       500:
 *         description: Server error
 */
router.post('/todos/:id/comment', authenticateToken, addCommentToTodo);

// delete comments from todo route
/**
 * @openapi
 * /api/todos/{id}/comment/{commentId}:
 *   delete:
 *     summary: Delete Comment from Todo
 *     description: Deletes a comment from a specific Todo by its ID
 *     tags: [Todo]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The Todo ID
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The Comment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       404:
 *         description: Todo not found
 *       403:
 *         description: Unauthorized to delete this comment
 *       500:
 *         description: Server error  
 */

router.delete('/todos/:id/comment/:commentId', authenticateToken, deleteCommentFromTodo);

// unlike todo route
/**
 * @openapi
 * /api/todos/{id}/unlike:
 *   put:
 *     summary: Unlike Todo
 *     description: Removes a like from a specific Todo by its ID
 *     tags: [Todo]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The Todo ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Like removed successfully
 *       404:
 *         description: Todo not found
 *       400:
 *         description: User has not liked this todo
 *       500:
 *         description: Server error
 */
router.put('/todos/:id/unlike', authenticateToken, unlikeTodo);

export default router;
