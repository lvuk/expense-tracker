import express from 'express';
import {
  add,
  getAll,
  editTransaction,
  deleteTransaction,
} from '../controllers/transactionController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const transactionRouter = express.Router();

transactionRouter.post('/add', verifyToken, add);
transactionRouter.post('/:userId', verifyToken, getAll);
transactionRouter.patch('/:transactionId', verifyToken, editTransaction);
transactionRouter.delete('/:transactionId', verifyToken, deleteTransaction);

//TO DO: delete transaction
// transactionRouter.delete('/remove');
//TO DO: edit transaction
// transactionRouter.patch('/edit');

export default transactionRouter;
