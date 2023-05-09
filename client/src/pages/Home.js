import { Input, Modal, Form, Select } from 'antd';
import DefaultLayout from '../components/DefaultLayout';
import '../resources/transactions.css';
import { useState } from 'react';

const Home = () => {
  const [showAddEditTransactionModal, setShowAddEditTransactionModal] =
    useState(false);

  const onSubmit = (values) => {
    console.log(values);
  };

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
        <Modal
          title='Add Expense'
          open={showAddEditTransactionModal}
          onCancel={() => setShowAddEditTransactionModal(false)}
          footer={false}
        >
          <Form
            layout='vertical'
            className='transaction-form'
            onFinish={onSubmit}
          >
            <Form.Item label='Amount' name='amount'>
              <Input type='text' />
            </Form.Item>

            <Form.Item label='Type' name='type'>
              <Select>
                <Select.Option value='income'>Income</Select.Option>
                <Select.Option value='expense'>Expense</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item label='Category' name='category'>
              <Select>
                <Select.Option value='salary'>Salary</Select.Option>
                <Select.Option value='rent'>Rent</Select.Option>
                <Select.Option value='food'>Food</Select.Option>
                <Select.Option value='entertainment'>
                  Entertainment
                </Select.Option>
                <Select.Option value='education'>Education</Select.Option>
                <Select.Option value='medical'>Medical</Select.Option>
                <Select.Option value='tax'>Tax</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item label='Date' name='date'>
              <Input type='date' />
            </Form.Item>

            <Form.Item label='Reference' name='reference'>
              <Input type='text' />
            </Form.Item>

            <Form.Item label='Description' name='description'>
              <Input type='text' />
            </Form.Item>

            <div className='d-flex justify-content-end'>
              <button className='btn'>Save</button>
            </div>
          </Form>
        </Modal>
      </div>
    </DefaultLayout>
  );
};
export default Home;
