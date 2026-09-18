import express from 'express';
import { protectAdmin } from '../../middleware/auth.middleware.js';
import { search } from './controller.js';

const router = express.Router();

router.get('/', protectAdmin, search);

export default router;