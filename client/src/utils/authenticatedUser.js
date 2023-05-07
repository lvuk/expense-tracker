export const authenticatedUser = () => {
  try {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    const data = { token, user };
    return data;
  } catch (error) {
    console.log(error);
  }
};
