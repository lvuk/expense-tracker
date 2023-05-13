import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div className='d-flex flex-column justfiy-content-center align-items-center'>
      <lottie-player
        src='https://assets1.lottiefiles.com/packages/lf20_ev7j1sm1.json'
        background='#272727'
        speed='1'
        style={{ width: '50%', height: '50%' }}
        loop
        autoplay
      />
      <Link to='/' className='btn'>
        Go back to Home Page
      </Link>
    </div>
  );
};
export default Error;
