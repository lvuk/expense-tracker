import { useNavigate } from 'react-router-dom';
import { logout } from '../api/auth';
import '../resources/default-layout.css';
import { authenticatedUser } from '../utils/authenticatedUser';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';

const DefaultLayout = (props) => {
  const navigate = useNavigate();
  const user = JSON.parse(authenticatedUser().user);

  const items = [
    {
      label: (
        <li
          onClick={() => {
            logout();
            navigate('/login');
          }}
        >
          Logout
        </li>
      ),
    },
  ];

  return (
    <div className='layout'>
      <header className='d-flex justify-content-between align-items-center'>
        <div>
          <h1 className='logo'>Expense Tracker</h1>
        </div>
        <div>
          {/* <h3 className='username'>{user.name}</h3> */}
          <Dropdown
            menu={{
              items,
            }}
            trigger={['click']}
          >
            <h3 onClick={(e) => e.preventDefault()}>
              <Space />
              <h3 className='username'>{user.name}</h3>
            </h3>
          </Dropdown>
        </div>
      </header>
      <div className='content d-flex justify-content-center align-items-center'>
        {props.children}
      </div>
    </div>
  );
};
export default DefaultLayout;
