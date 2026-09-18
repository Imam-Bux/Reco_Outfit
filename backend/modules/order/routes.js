import express from 'express';
import { protectAdmin } from '../../middleware/auth.middleware.js';
import {
  addOrder,
  editOrder,
  deleteOrder,
  toggleOrderStatus,
  getOrder,
  getAllOrders,
} from './controller.js';

const router = express.Router();

router.use(protectAdmin);

router.get('/', getAllOrders);
router.get('/:orderId', getOrder);
router.post('/', addOrder);
router.put('/:orderId', editOrder);
router.delete('/:orderId', deleteOrder);
router.patch('/:orderId/toggle-status', toggleOrderStatus);

export default router;