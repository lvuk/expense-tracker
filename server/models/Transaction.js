import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String, required: true },
  category: { type: String, required: true },
  reference: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
});

const Transaction = mongoose.model('Transaction', TransactionSchema);

export default Transaction;
