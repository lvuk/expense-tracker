import Transaction from '../models/Transaction.js';

export const add = async (req, res) => {
  try {
    console.log(req.body);
    const { amount, type, category, reference, description, date, userId } =
      req.body;
    const newTransaction = new Transaction({
      amount,
      type,
      category,
      reference,
      description,
      date,
      userId,
    });
    const transaction = await newTransaction.save();
    res.status(201).json({ transaction });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAll = async (req, res) => {
  try {
    const userId = req.params.userId;
    const transactions = await Transaction.find({ userId });
    res.status(200).json({ transactions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
