import express from 'express';
import { body, validationResult } from 'express-validator';
import { submitContactForm } from '../controllers/contactController.js';

const router = express.Router();

router.post(
	'/contact',
	[
		body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Invalid name'),
		body('email').isEmail().normalizeEmail().withMessage('Invalid email'),
		body('message').trim().isLength({ min: 10, max: 2000 }).withMessage('Message is too short'),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
		return submitContactForm(req, res);
	}
);

export default router;