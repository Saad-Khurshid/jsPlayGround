import express from 'express';
import {
    getAllCustomers,
    createCustomer,
    getCustomerById,
    updateCustomer,
    deleteCustomer
} from '../controllers/customer';
import auth from '../middlewares/auth';
import admin from '../middlewares/admin';

const router = express.Router();

router.get('/', getAllCustomers);

router.post('/', createCustomer);

router.get('/:id', getCustomerById);

router.put('/:id', auth, updateCustomer);

router.delete('/:id', [auth, admin], deleteCustomer);

export default router;
