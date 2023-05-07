import { Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import '../resources/auth.css';
import validator from 'validator';
import { login } from '../api/auth';
import { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import { authenticatedUser } from '../utils/authenticatedUser';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values) => {
    const { email, password } = values;
    if (!email || !password) {
      message.error("Values can't be empty!");
    } else if (!validator.isEmail(email)) {
      message.error('Email is not in correct form!');
    }

    try {
      setLoading(true);
      const response = await login(email, password);
      if (response.error) {
        setLoading(false);
        message.error(response.error);
      } else {
        setLoading(false);
        message.success('Logged in successfully! Please wait...', 0.6);
        setTimeout(() => {
          navigate('/');
        }, 1000);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (authenticatedUser().user) {
      navigate('/');
    }
  });

  return (
    <div className='register'>
      {loading && <Loading />}
      <div className='row justify-content-center align-items-center w-100 h-100'>
        <div className='col-md-5'>
          <Form layout='vertical' onFinish={onSubmit}>
            <h1>EXPENSE TRACKER - LOGIN</h1>
            <Form.Item label='Email' name='email'>
              <Input type='text' />
            </Form.Item>
            <Form.Item label='Password' name='password'>
              <Input type='password' />
            </Form.Item>
            <div className='d-flex justify-content-between align-items-center'>
              <Link className='link' to='/register'>
                Not yet a user? Click here to register
              </Link>
              <button className='btn' type='submit'>
                Login
              </button>
            </div>
          </Form>
        </div>
        <div className='col-md-5'>
          <div className='lottie'>
            <lottie-player
              src='https://assets9.lottiefiles.com/packages/lf20_06a6pf9i.json'
              background='transparent'
              speed='1'
              loop
              autoplay
            ></lottie-player>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
