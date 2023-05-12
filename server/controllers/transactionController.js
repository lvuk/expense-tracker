import Transaction from '../models/Transaction.js';
import moment from 'moment';

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

    if (!amount || !type || !category || !reference || !date) {
      return res.status(400).json({ error: "Values can't be empty" });
    }

    const transaction = await newTransaction.save();
    return res.status(201).json({ transaction });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getAll = async (req, res) => {
  try {
    const userId = req.params.userId;
    const frequency = req.query.freq;
    const { selectedRange, type } = req.body;
    console.log(req.body);
    const transactions = await Transaction.find({
      ...(frequency !== 'custom'
        ? {
            date: {
              $gt: moment().subtract(Number(frequency), 'd').toDate(),
            },
          }
        : {
            date: {
              $gte: selectedRange[0],
              $lte: selectedRange[1],
            },
          }),
      userId,
      ...(type !== 'all' && { type }),
    });
    return res.status(200).json({ transactions });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const editTransaction = async (req, res) => {
  try {
    const transactionId = req.params.transactionId;

    const transaction = await Transaction.findOneAndUpdate(
      { _id: transactionId },
      req.body
    );

    return res.status(201).json({ transaction });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const transactionId = req.params.transactionId;

    const transaction = await Transaction.findOneAndDelete({
      _id: transactionId,
    });

    return res.status(202).json({ transaction });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
