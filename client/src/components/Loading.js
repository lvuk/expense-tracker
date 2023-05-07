import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const Loading = () => {
  const antIcon = (
    <LoadingOutlined style={{ fontSize: '10em', color: '#6eeb83' }} spin />
  );
  return (
    <div className='spinner'>
      <Spin indicator={antIcon} size='large' />;
    </div>
  );
};
export default Loading;
