import DefaultLayout from '../components/DefaultLayout';
import '../resources/transactions.css';
import { useState } from 'react';
import AddEditModal from '../components/AddEditModal';

const Home = () => {
  const [showAddEditTransactionModal, setShowAddEditTransactionModal] =
    useState(false);

  return (
    <DefaultLayout>
      <div className='filter d-flex justify-content-between align-items-center'>
        <div></div>
        <div>
          <button
            className='btn'
            onClick={() => setShowAddEditTransactionModal(true)}
          >
            Add
          </button>
        </div>
      </div>
      <div className='table-analitics'>
        {showAddEditTransactionModal && (
          <AddEditModal
            showAddEditTransactionModal={showAddEditTransactionModal}
            setShowAddEditTransactionModal={setShowAddEditTransactionModal}
          />
        )}
      </div>
    </DefaultLayout>
  );
};
export default Home;
