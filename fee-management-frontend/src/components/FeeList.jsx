import React, { useState, useEffect } from 'react';
import { feeApi, studentApi } from '../services/api';

const FeeList = () => {
  const [fees, setFees] = useState([]);
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentFee, setCurrentFee] = useState({
    studentId: '',
    amount: '',
    description: '',
    dueDate: '',
    status: 'PENDING',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchFees();
    fetchStudents();
  }, []);

  const fetchFees = async () => {
    try {
      const response = await feeApi.getAll();
      setFees(response.data);
    } catch (error) {
      console.error('Error fetching fees:', error);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await studentApi.getAll();
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const feeData = {
        ...currentFee,
        studentId: parseInt(currentFee.studentId),
        amount: parseFloat(currentFee.amount),
      };
      if (isEditing) {
        await feeApi.update(editingId, feeData);
      } else {
        await feeApi.create(feeData);
      }
      fetchFees();
      resetForm();
    } catch (error) {
      console.error('Error saving fee:', error);
    }
  };

  const handleEdit = (fee) => {
    setCurrentFee({
      ...fee,
      studentId: fee.student.id,
    });
    setIsEditing(true);
    setEditingId(fee.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this fee?')) {
      try {
        await feeApi.delete(id);
        fetchFees();
      } catch (error) {
        console.error('Error deleting fee:', error);
      }
    }
  };

  const resetForm = () => {
    setCurrentFee({
      studentId: '',
      amount: '',
      description: '',
      dueDate: '',
      status: 'PENDING',
    });
    setIsEditing(false);
    setEditingId(null);
    setShowForm(false);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'PAID':
        return 'status-paid';
      case 'PENDING':
        return 'status-pending';
      case 'OVERDUE':
        return 'status-overdue';
      default:
        return '';
    }
  };

  return (
    <div className="container">
      <h2>Fee Management</h2>
      <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancel' : 'Add New Fee'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="form-container">
          <h3>{isEditing ? 'Edit Fee' : 'Add New Fee'}</h3>
          <div className="form-group">
            <label>Student:</label>
            <select
              value={currentFee.studentId}
              onChange={(e) => setCurrentFee({ ...currentFee, studentId: e.target.value })}
              required
            >
              <option value="">Select Student</option>
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Amount:</label>
            <input
              type="number"
              step="0.01"
              value={currentFee.amount}
              onChange={(e) => setCurrentFee({ ...currentFee, amount: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <input
              type="text"
              value={currentFee.description}
              onChange={(e) => setCurrentFee({ ...currentFee, description: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Due Date:</label>
            <input
              type="date"
              value={currentFee.dueDate}
              onChange={(e) => setCurrentFee({ ...currentFee, dueDate: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Status:</label>
            <select
              value={currentFee.status}
              onChange={(e) => setCurrentFee({ ...currentFee, status: e.target.value })}
              required
            >
              <option value="PENDING">Pending</option>
              <option value="PAID">Paid</option>
              <option value="OVERDUE">Overdue</option>
            </select>
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
            <th>Student</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {fees.map((fee) => (
            <tr key={fee.id}>
              <td>{fee.id}</td>
              <td>{fee.student?.name || 'N/A'}</td>
              <td>${fee.amount.toFixed(2)}</td>
              <td>{fee.description}</td>
              <td>{fee.dueDate}</td>
              <td>
                <span className={`status-badge ${getStatusClass(fee.status)}`}>
                  {fee.status}
                </span>
              </td>
              <td>
                <button className="btn btn-sm btn-edit" onClick={() => handleEdit(fee)}>
                  Edit
                </button>
                <button className="btn btn-sm btn-delete" onClick={() => handleDelete(fee.id)}>
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

export default FeeList;
