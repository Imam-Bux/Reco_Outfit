import express from 'express';
import { protectAdmin } from '../../middleware/auth.middleware.js';
import {
  addCustomer,
  editCustomer,
  deleteCustomer,
  getCustomer,
  getAllCustomers,
} from './controller.js';

const router = express.Router();

router.use(protectAdmin);

router.get('/', getAllCustomers);
router.get('/:customerId', getCustomer);
router.post('/', addCustomer);
router.put('/:customerId', editCustomer);
router.delete('/:customerId', deleteCustomer);

export default router;