import express from 'express';
import authRouter from './authRouter.js';
import transactionRouter from './transactionRouter.js';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/transaction', transactionRouter);

export default router;
