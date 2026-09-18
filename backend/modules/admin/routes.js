import express from 'express';
import { loginAdmin, changeAdminPassword } from './controller.js';
import { protectAdmin } from '../../middleware/auth.middleware.js';
import customerRoutes from '../customer/routes.js';
import orderRoutes from '../order/routes.js';
import receiptRoutes from '../receipt/routes.js';
import uploadRoutes from '../upload/routes.js';
import searchRoutes from '../search/routes.js';

const router = express.Router();

router.post('/login', loginAdmin);
router.put('/change-password', protectAdmin, changeAdminPassword);

router.use('/customers', customerRoutes);
router.use('/orders', orderRoutes);
router.use('/receipts', receiptRoutes);
router.use('/upload', uploadRoutes);
router.use('/search', searchRoutes);

export default router;