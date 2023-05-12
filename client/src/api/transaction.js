import axios from 'axios';
import { authenticatedUser } from '../utils/authenticatedUser';

export const addNewTransaction = async (values) => {
  try {
    const token = authenticatedUser().token;

    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/transaction/add`,
      { ...values },
      { headers: { Authorization: token } }
    );

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const editTransaction = async (values) => {
  try {
    const token = authenticatedUser().token;

    const response = await axios.patch(
      `${process.env.REACT_APP_API_URL}/transaction/${values.transactionId}`,
      { ...values },
      { headers: { Authorization: token } }
    );

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteTransaction = async (transactionId) => {
  try {
    const token = authenticatedUser().token;

    const response = await axios.delete(
      `${process.env.REACT_APP_API_URL}/transaction/${transactionId}`,
      { headers: { Authorization: token } }
    );

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getUserTransactions = async (frequency, selectedRange, type) => {
  try {
    const token = authenticatedUser().token;
    const userId = JSON.parse(authenticatedUser().user)._id;

    if (frequency === 'custom' && selectedRange === null) return;

    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/transaction/${userId}?freq=${frequency}`,
      {
        ...(frequency === 'custom' && { selectedRange }),
        type,
      },
      { headers: { Authorization: token } }
    );

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
