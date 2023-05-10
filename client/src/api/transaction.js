import axios from 'axios';

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
