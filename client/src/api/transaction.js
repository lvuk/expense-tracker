import axios from 'axios';
import { authenticatedUser } from '../utils/authenticatedUser';

export const getAllTransactions = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/transaction/`
    );

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const addNewTransaction = async (values) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/transaction/add`,
      { ...values }
    );

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const editTransaction = async (values) => {
  try {
    const response = await axios.patch(
      `${process.env.REACT_APP_API_URL}/transaction/${values.transactionId}`,
      { ...values }
    );

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteTransaction = async (transactionId) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_API_URL}/transaction/${transactionId}`
    );

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getUserTransactions = async (frequency, selectedRange, type) => {
  try {
    const userId = JSON.parse(authenticatedUser().user)._id;

    if (frequency === 'custom' && selectedRange === null) return;

    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/transaction/${userId}?freq=${frequency}`,
      {
        ...(frequency === 'custom' && { selectedRange }),
        type,
      }
    );

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
