import '../resources/default-layout.css';

const DefaultLayout = (props) => {
  return (
    <div className='layout'>
      <header className='d-flex justify-content-between align-items-center'>
        <div>
          <h1 className='logo'>Expense Tracker</h1>
        </div>
        <div>
          <h3 className='username'>username</h3>
        </div>
      </header>
      <div className='content d-flex justify-content-center align-items-center'>
        {props.children}
      </div>
    </div>
  );
};
export default DefaultLayout;
