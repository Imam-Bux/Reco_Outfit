import express from 'express';
import { protectAdmin } from '../../middleware/auth.middleware.js';
import { generateReceipt, printReceipt, printKarigarReceipt } from './controller.js';

const router = express.Router();

router.get('/:orderId/print-karigar', protectAdmin, printKarigarReceipt);
router.get('/:orderId/print', protectAdmin, printReceipt);
router.get('/:orderId', protectAdmin, generateReceipt);

export default router;