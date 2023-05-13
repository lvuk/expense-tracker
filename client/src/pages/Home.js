import DefaultLayout from '../components/DefaultLayout';
import '../resources/transactions.css';
import { useCallback, useEffect, useState } from 'react';
import AddEditModal from '../components/AddEditModal';
import { deleteTransaction, getUserTransactions } from '../api/transaction';
import { Select, DatePicker, Table, message } from 'antd';
import Loading from '../components/Loading';
import moment from 'moment';
import { EditSOutline, DeleteOutline } from 'antd-mobile-icons';

const Home = () => {
  const [showAddEditTransactionModal, setShowAddEditTransactionModal] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const [transactionsData, setTransactionsData] = useState([]);
  const [frequency, setFrequency] = useState('7');
  const { RangePicker } = DatePicker;
  const [selectedRange, setSelectedRange] = useState([]);
  const [type, setType] = useState('all');
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await getUserTransactions(
        frequency,
        selectedRange,
        type
      );
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
  }, [frequency, selectedRange, type]);

  const handleNewTransactionAdded = async (newTransaction) => {
    setTransactionsData((prevTransactions) => [
      ...prevTransactions,
      newTransaction,
    ]);

    await fetchData();
  };

  const handleDelete = async (record) => {
    try {
      await deleteTransaction(record._id);
      message.success('Transaction Deleted Successfully');
      fetchData();
    } catch (error) {
      message.error('Something Went Wrong!');
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      render: (date) => <label>{moment(date).format('DD.MM.YYYY')}</label>,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
    },
    {
      title: 'Category',
      dataIndex: 'category',
    },
    {
      title: 'Type',
      dataIndex: 'type',
    },
    {
      title: 'Reference',
      dataIndex: 'reference',
    },
    {
      title: 'Action',
      dataIndex: 'actions',
      render: (text, record) => {
        return (
          <div className='d-flex'>
            <EditSOutline
              className='edit-icon'
              onClick={() => {
                setSelectedItemForEdit(record);
                setShowAddEditTransactionModal(true);
              }}
            />
            <DeleteOutline
              className='ms-3 delete-icon'
              onClick={() => handleDelete(record)}
            />
          </div>
        );
      },
    },
  ];

  return (
    <DefaultLayout>
      {loading && <Loading />}
      <div className='filter d-flex justify-content-between align-items-center'>
        <div className='d-flex'>
          <div className='d-flex flex-column'>
            <p>Select Frequency</p>
            <Select value={frequency} onChange={(value) => setFrequency(value)}>
              <Select.Option value='7'>Last 7 Days</Select.Option>
              <Select.Option value='30'>Last 30 Days</Select.Option>
              <Select.Option value='365'>Last Year</Select.Option>
              <Select.Option value='custom'>Custom</Select.Option>
            </Select>
            {frequency === 'custom' && (
              <div className='mt-2'>
                <RangePicker
                  value={selectedRange}
                  onChange={(values) => setSelectedRange(values)}
                />
              </div>
            )}
          </div>
          <div className='d-flex flex-column ms-4'>
            <p>Select Type</p>
            <Select value={type} onChange={(type) => setType(type)}>
              <Select.Option value='income'>Income</Select.Option>
              <Select.Option value='expense'>Expense</Select.Option>
              <Select.Option value='all'>All</Select.Option>
            </Select>
          </div>
        </div>
        <div>
          <button
            className='btn add-btn'
            onClick={() => setShowAddEditTransactionModal(true)}
          >
            Add
          </button>
        </div>
      </div>
      <div className='table-analitics'>
        <div className='table'>
          <Table
            columns={columns}
            dataSource={transactionsData}
            scroll={{ x: true }}
          />
        </div>
      </div>
      {showAddEditTransactionModal && (
        <AddEditModal
          showAddEditTransactionModal={showAddEditTransactionModal}
          setShowAddEditTransactionModal={setShowAddEditTransactionModal}
          onNewTransactionAdded={handleNewTransactionAdded}
          selectedItemForEdit={selectedItemForEdit}
          setSelectedItemForEdit={setSelectedItemForEdit}
        />
      )}
    </DefaultLayout>
  );
};
export default Home;
