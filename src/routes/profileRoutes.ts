import { Router } from 'express';
import { createProfile, deleteProfileById, getProfileById, updateProfileById } from '../controllers/profileControllers';
import { authenticateToken } from '../middleware/auth';

// Profile creation route
/**
 * @openapi
 * /api/profiles:
 *   post:
 *     summary: Create a new user profile
 *     description: Creates a new profile for a user
 *     tags: [Profile]
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
 *               currentJob:
 *                 type: string
 *               age:
 *                 type: integer
 *               company:
 *                 type: string
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Profile created successfully
 *       400:
 *         description: Invalid request
 */
const router = Router();
router.post('/profiles', authenticateToken, createProfile);

// get Profile by id route
/**
 * @openapi
 * /api/profiles/{id}:
 *   get:
 *     summary: Get a user profile by userId
 *     description: Retrieves a user profile using its userId
 *     tags: [Profile]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The profile ID
 *     responses:
 *       200:
 *         description: Profile retrieved successfully
 *       404:
 *         description: Profile not found
 */
router.get('/profiles/:id', authenticateToken, getProfileById);

// update Profile by id route
/**
 * @openapi
 * /api/profiles/{id}/update:
 *   put:
 *     summary: Update a user profile by userId
 *     description: Updates a user profile using its userId
 *     tags: [Profile]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The profile ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentJob:
 *                 type: string
 *               age:
 *                 type: integer
 *               company:
 *                 type: string
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       404:
 *         description: Profile not found
 */
router.put('/profiles/:id/update', authenticateToken, updateProfileById);

// delete Profile by userId route
/**
 * @openapi
 * /api/profiles/{id}/delete:
 *   delete:
 *     summary: Delete a user profile by userId
 *     description: Deletes a user profile using its userId
 *     tags: [Profile]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The profile ID
 *     responses:
 *       200:
 *         description: Profile deleted successfully
 *       404:
 *         description: Profile not found
 */
router.delete('/profiles/:id/delete', authenticateToken, deleteProfileById);

export default router;