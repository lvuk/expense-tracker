import DefaultLayout from '../components/DefaultLayout';
import '../resources/transactions.css';
import { useEffect, useState } from 'react';
import AddEditModal from '../components/AddEditModal';
import { getUserTransactions } from '../api/transaction';
import { Table, message } from 'antd';
import Loading from '../components/Loading';

const Home = () => {
  const [showAddEditTransactionModal, setShowAddEditTransactionModal] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const [transactionsData, setTransactionsData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await getUserTransactions();
      if (response.error) {
        setLoading(false);
        message.error(response.error);
      } else {
        setLoading(false);
        setTransactionsData(response.transactions);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleNewTransactionAdded = async (newTransaction) => {
    setTransactionsData((prevTransactions) => [
      ...prevTransactions,
      newTransaction,
    ]);

    await fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: '_id',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: '_id',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: '_id',
    },
    {
      title: 'Reference',
      dataIndex: 'reference',
      key: '_id',
    },
  ];

  return (
    <DefaultLayout>
      {loading && <Loading />}
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
        <div className='table'>
          <Table columns={columns} dataSource={transactionsData} />
        </div>
      </div>
      {showAddEditTransactionModal && (
        <AddEditModal
          showAddEditTransactionModal={showAddEditTransactionModal}
          setShowAddEditTransactionModal={setShowAddEditTransactionModal}
          onNewTransactionAdded={handleNewTransactionAdded}
        />
      )}
    </DefaultLayout>
  );
};
export default Home;
