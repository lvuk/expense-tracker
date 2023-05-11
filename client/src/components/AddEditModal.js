import { Modal, Form, Select, Input, message } from 'antd';
import { useState } from 'react';
import Loading from './Loading';
import { addNewTransaction, editTransaction } from '../api/transaction';
import { authenticatedUser } from '../utils/authenticatedUser';

const AddEditModal = ({
  showAddEditTransactionModal,
  setShowAddEditTransactionModal,
  onNewTransactionAdded,
  selectedItemForEdit,
  setSelectedItemForEdit,
}) => {
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values) => {
    try {
      const user = JSON.parse(authenticatedUser().user);
      setLoading(true);
      if (!selectedItemForEdit) {
        const response = await addNewTransaction({
          ...values,
          userId: user._id,
        });
        if (response.error) {
          setLoading(false);
          message.error(response.error);
          setShowAddEditTransactionModal(false);
        } else {
          onNewTransactionAdded();
          setLoading(false);
          message.success('Transaction Added Successfully!');
          setShowAddEditTransactionModal(false);
          setSelectedItemForEdit(null);
        }
      } else {
        const response = await editTransaction({
          ...values,
          userId: user._id,
          transactionId: selectedItemForEdit._id,
        });
        if (response.error) {
          setLoading(false);
          message.error(response.error);
          setShowAddEditTransactionModal(false);
        } else {
          onNewTransactionAdded();
          setLoading(false);
          message.success('Transaction Updated Successfully!');
          setShowAddEditTransactionModal(false);
          setSelectedItemForEdit(null);
        }
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <Modal
      title={selectedItemForEdit ? 'Edit Transaction' : 'Add Transaction'}
      open={showAddEditTransactionModal}
      onCancel={() => setShowAddEditTransactionModal(false)}
      footer={false}
    >
      {loading && <Loading />}

      <Form
        layout='vertical'
        className='transaction-form'
        onFinish={onSubmit}
        initialValues={selectedItemForEdit}
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
            <Select.Option value='entertainment'>Entertainment</Select.Option>
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
  );
};
export default AddEditModal;
