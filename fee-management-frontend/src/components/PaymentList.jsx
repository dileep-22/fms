import React, { useState, useEffect } from 'react';
import { paymentApi, feeApi } from '../services/api';

const PaymentList = () => {
  const [payments, setPayments] = useState([]);
  const [fees, setFees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentPayment, setCurrentPayment] = useState({
    feeId: '',
    amount: '',
    paymentDate: new Date().toISOString().split('T')[0],
    paymentMethod: 'CASH',
    notes: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchPayments();
    fetchFees();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await paymentApi.getAll();
      setPayments(response.data);
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  };

  const fetchFees = async () => {
    try {
      const response = await feeApi.getAll();
      setFees(response.data.filter(fee => fee.status === 'PENDING' || fee.status === 'OVERDUE'));
    } catch (error) {
      console.error('Error fetching fees:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const paymentData = {
        ...currentPayment,
        feeId: parseInt(currentPayment.feeId),
        amount: parseFloat(currentPayment.amount),
      };
      if (isEditing) {
        await paymentApi.update(editingId, paymentData);
      } else {
        await paymentApi.create(paymentData);
      }
      fetchPayments();
      resetForm();
    } catch (error) {
      console.error('Error saving payment:', error);
    }
  };

  const handleEdit = (payment) => {
    setCurrentPayment({
      ...payment,
      feeId: payment.fee.id,
    });
    setIsEditing(true);
    setEditingId(payment.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this payment?')) {
      try {
        await paymentApi.delete(id);
        fetchPayments();
      } catch (error) {
        console.error('Error deleting payment:', error);
      }
    }
  };

  const resetForm = () => {
    setCurrentPayment({
      feeId: '',
      amount: '',
      paymentDate: new Date().toISOString().split('T')[0],
      paymentMethod: 'CASH',
      notes: '',
    });
    setIsEditing(false);
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="container">
      <h2>Payment Management</h2>
      <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancel' : 'Add New Payment'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="form-container">
          <h3>{isEditing ? 'Edit Payment' : 'Add New Payment'}</h3>
          <div className="form-group">
            <label>Fee:</label>
            <select
              value={currentPayment.feeId}
              onChange={(e) => setCurrentPayment({ ...currentPayment, feeId: e.target.value })}
              required
            >
              <option value="">Select Fee</option>
              {fees.map((fee) => (
                <option key={fee.id} value={fee.id}>
                  {fee.student?.name} - {fee.description} (${fee.amount})
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Amount:</label>
            <input
              type="number"
              step="0.01"
              value={currentPayment.amount}
              onChange={(e) => setCurrentPayment({ ...currentPayment, amount: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Payment Date:</label>
            <input
              type="date"
              value={currentPayment.paymentDate}
              onChange={(e) => setCurrentPayment({ ...currentPayment, paymentDate: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Payment Method:</label>
            <select
              value={currentPayment.paymentMethod}
              onChange={(e) => setCurrentPayment({ ...currentPayment, paymentMethod: e.target.value })}
              required
            >
              <option value="CASH">Cash</option>
              <option value="CARD">Card</option>
              <option value="BANK_TRANSFER">Bank Transfer</option>
              <option value="CHECK">Check</option>
              <option value="ONLINE">Online</option>
            </select>
          </div>
          <div className="form-group">
            <label>Notes:</label>
            <textarea
              value={currentPayment.notes}
              onChange={(e) => setCurrentPayment({ ...currentPayment, notes: e.target.value })}
            />
          </div>
          <button type="submit" className="btn btn-success">
            {isEditing ? 'Update' : 'Create'}
          </button>
        </form>
      )}

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Fee</th>
            <th>Amount</th>
            <th>Payment Date</th>
            <th>Payment Method</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id}>
              <td>{payment.id}</td>
              <td>{payment.fee?.student?.name || 'N/A'} - {payment.fee?.description || 'N/A'}</td>
              <td>${payment.amount.toFixed(2)}</td>
              <td>{payment.paymentDate}</td>
              <td>{payment.paymentMethod}</td>
              <td>{payment.notes || '-'}</td>
              <td>
                <button className="btn btn-sm btn-edit" onClick={() => handleEdit(payment)}>
                  Edit
                </button>
                <button className="btn btn-sm btn-delete" onClick={() => handleDelete(payment.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentList;
