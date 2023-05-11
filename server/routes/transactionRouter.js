import express from 'express';
import {
  add,
  getAll,
  editTransaction,
  deleteTransaction,
} from '../controllers/transactionController.js';

const transactionRouter = express.Router();

transactionRouter.post('/add', add);
transactionRouter.post('/:userId', getAll);
transactionRouter.patch('/:transactionId', editTransaction);
transactionRouter.delete('/:transactionId', deleteTransaction);

//TO DO: delete transaction
// transactionRouter.delete('/remove');
//TO DO: edit transaction
// transactionRouter.patch('/edit');

export default transactionRouter;
