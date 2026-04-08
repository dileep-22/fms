import React, { useState, useEffect } from 'react';
import { studentApi } from '../services/api';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentStudent, setCurrentStudent] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

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
      if (isEditing) {
        await studentApi.update(editingId, currentStudent);
      } else {
        await studentApi.create(currentStudent);
      }
      fetchStudents();
      resetForm();
    } catch (error) {
      console.error('Error saving student:', error);
    }
  };

  const handleEdit = (student) => {
    setCurrentStudent(student);
    setIsEditing(true);
    setEditingId(student.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await studentApi.delete(id);
        fetchStudents();
      } catch (error) {
        console.error('Error deleting student:', error);
      }
    }
  };

  const resetForm = () => {
    setCurrentStudent({
      name: '',
      email: '',
      phone: '',
      address: '',
    });
    setIsEditing(false);
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="container">
      <h2>Student Management</h2>
      <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancel' : 'Add New Student'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="form-container">
          <h3>{isEditing ? 'Edit Student' : 'Add New Student'}</h3>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              value={currentStudent.name}
              onChange={(e) => setCurrentStudent({ ...currentStudent, name: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={currentStudent.email}
              onChange={(e) => setCurrentStudent({ ...currentStudent, email: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Phone:</label>
            <input
              type="text"
              value={currentStudent.phone}
              onChange={(e) => setCurrentStudent({ ...currentStudent, phone: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Address:</label>
            <textarea
              value={currentStudent.address}
              onChange={(e) => setCurrentStudent({ ...currentStudent, address: e.target.value })}
              required
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
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.phone}</td>
              <td>{student.address}</td>
              <td>
                <button className="btn btn-sm btn-edit" onClick={() => handleEdit(student)}>
                  Edit
                </button>
                <button className="btn btn-sm btn-delete" onClick={() => handleDelete(student.id)}>
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

export default StudentList;
