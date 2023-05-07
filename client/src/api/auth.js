import axios from 'axios';
import { message } from 'antd';

export const register = async (name, email, password) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/register`,
      {
        name,
        email,
        password,
      }
    );

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/login`,
      {
        email,
        password,
      }
    );

    const { user, token } = response.data;
    if (!user || !token) {
      return message.error('Something went wrong');
    } else {
      localStorage.clear();
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', `Bearer ${JSON.stringify(token)}`);
    }

    // console.log(response.data);

    return response.data;
  } catch (error) {
    // console.log(error);
    return error.response.data;
  }
};

export const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};
