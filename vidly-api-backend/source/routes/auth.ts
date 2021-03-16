import express from 'express';
import { authenticate } from '../controllers/auth';

const router = express.Router();

router.post('/', authenticate);

export default router;
