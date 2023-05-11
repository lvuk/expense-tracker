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

export const getUserTransactions = async () => {
  try {
    const userId = JSON.parse(authenticatedUser().user)._id;
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/transaction/${userId}`
    );

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
