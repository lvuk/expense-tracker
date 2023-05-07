import { Form, Input, message } from 'antd';
import { Link } from 'react-router-dom';
import '../resources/auth.css';
import validator from 'validator';
import { register } from '../api/auth.js';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const onSubmit = async (values) => {
    const { name, email, password } = values;
    // if (!name || !email || !password) {
    //   message.error("Inputs can't be empty");
    // } else if (!validator.isEmail(email)) {
    //   message.error('Email is not in correct form');
    // }

    try {
      const response = await register(name, email, password);
      console.log(response);
      if (response.error) {
        message.error(response.error);
      } else {
        message.success('Registered successfully! Please wait...', 0.6);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='register'>
      <div className='row justify-content-center align-items-center w-100 h-100'>
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
        <div className='col-md-5'>
          <Form layout='vertical' onFinish={onSubmit}>
            <h1>EXPENSE TRACKER - REGISTER</h1>
            <Form.Item label='Name' name='name'>
              <Input type='text' />
            </Form.Item>
            <Form.Item label='Email' name='email'>
              <Input type='text' />
            </Form.Item>
            <Form.Item label='Password' name='password'>
              <Input type='password' />
            </Form.Item>
            <div className='d-flex justify-content-between align-items-center'>
              <Link className='link' to='/login'>
                Already Registered? Click Here To Login
              </Link>
              <button className='btn' type='submit'>
                Register
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default Register;
