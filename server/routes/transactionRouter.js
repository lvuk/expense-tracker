import express from 'express';
import { add, getAll } from '../controllers/transactionController.js';

const transactionRouter = express.Router();

transactionRouter.post('/add', add);
transactionRouter.get('/:userId', getAll);
//TO DO: delete transaction
// transactionRouter.delete('/remove');
//TO DO: edit transaction
// transactionRouter.patch('/edit');

export default transactionRouter;
