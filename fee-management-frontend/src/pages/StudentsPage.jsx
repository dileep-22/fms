import { useState } from 'react';
import { Search, Plus, Edit2, Trash2, Eye, X } from 'lucide-react';
import { useToast } from '../context/ToastContext';

const StudentsPage = () => {
  const toast = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterClass, setFilterClass] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [students] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', class: 'Grade 10', phone: '+1 234 567 890', status: 'paid', fees: 1500 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', class: 'Grade 9', phone: '+1 234 567 891', status: 'pending', fees: 1500 },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', class: 'Grade 11', phone: '+1 234 567 892', status: 'paid', fees: 1800 },
    { id: 4, name: 'Emily Davis', email: 'emily@example.com', class: 'Grade 10', phone: '+1 234 567 893', status: 'overdue', fees: 1500 },
    { id: 5, name: 'Chris Wilson', email: 'chris@example.com', class: 'Grade 12', phone: '+1 234 567 894', status: 'paid', fees: 2000 },
    { id: 6, name: 'Sarah Brown', email: 'sarah@example.com', class: 'Grade 9', phone: '+1 234 567 895', status: 'pending', fees: 1500 },
  ]);

  const classes = ['all', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'];
  const statuses = ['all', 'paid', 'pending', 'overdue'];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = filterClass === 'all' || student.class === filterClass;
    const matchesStatus = filterStatus === 'all' || student.status === filterStatus;
    return matchesSearch && matchesClass && matchesStatus;
  });

  const handleAdd = () => {
    setModalMode('add');
    setSelectedStudent(null);
    setShowModal(true);
  };

  const handleEdit = (student) => {
    setModalMode('edit');
    setSelectedStudent(student);
    setShowModal(true);
  };

  const handleDelete = (student) => {
    if (window.confirm(`Are you sure you want to delete ${student.name}?`)) {
      toast.success(`${student.name} deleted successfully`);
    }
  };

  const handleView = (student) => {
    setModalMode('view');
    setSelectedStudent(student);
    setShowModal(true);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Students</h1>
          <p className="text-neutral-500 mt-1">Manage student records and fee status</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center justify-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-xl hover:bg-primary-700 transition-all btn-animate shadow-lg shadow-primary-500/30"
        >
          <Plus className="w-5 h-5" />
          Add Student
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 border border-neutral-100 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Class Filter */}
          <select
            value={filterClass}
            onChange={(e) => setFilterClass(e.target.value)}
            className="px-4 py-2.5 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
          >
            <option value="all">All Classes</option>
            {classes.filter(c => c !== 'all').map(cls => (
              <option key={cls} value={cls}>{cls}</option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2.5 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
          >
            <option value="all">All Status</option>
            {statuses.filter(s => s !== 'all').map(status => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50">
              <tr>
                <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-6 py-3">Student</th>
                <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-6 py-3">Class</th>
                <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-6 py-3">Contact</th>
                <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-6 py-3">Fees</th>
                <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-6 py-3">Status</th>
                <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mb-4">
                        <Search className="w-8 h-8 text-neutral-400" />
                      </div>
                      <p className="text-neutral-600 font-medium">No students found</p>
                      <p className="text-neutral-500 text-sm mt-1">Try adjusting your search or filters</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => (
                  <tr key={student.id} className="table-row-hover">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-medium">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-medium text-neutral-900">{student.name}</p>
                          <p className="text-sm text-neutral-500">{student.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-neutral-600">{student.class}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-neutral-600">{student.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-neutral-900">
                      ${student.fees.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                        student.status === 'paid' ? 'bg-green-100 text-green-700' :
                        student.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleView(student)}
                          className="p-2 hover:bg-blue-50 rounded-lg transition-colors text-blue-600"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEdit(student)}
                          className="p-2 hover:bg-yellow-50 rounded-lg transition-colors text-yellow-600"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(student)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b border-neutral-100">
              <h2 className="text-xl font-bold text-neutral-900">
                {modalMode === 'add' ? 'Add Student' :
                 modalMode === 'edit' ? 'Edit Student' : 'Student Details'}
              </h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-neutral-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {modalMode === 'view' && selectedStudent ? (
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-2xl font-bold">
                    {selectedStudent.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900">{selectedStudent.name}</h3>
                    <p className="text-neutral-500">{selectedStudent.class}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-neutral-500">Email</p>
                    <p className="font-medium text-neutral-900">{selectedStudent.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">Phone</p>
                    <p className="font-medium text-neutral-900">{selectedStudent.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">Fee Amount</p>
                    <p className="font-medium text-neutral-900">${selectedStudent.fees.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">Status</p>
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                      selectedStudent.status === 'paid' ? 'bg-green-100 text-green-700' :
                      selectedStudent.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {selectedStudent.status.charAt(0).toUpperCase() + selectedStudent.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <form className="p-6 space-y-4" onSubmit={(e) => {
                e.preventDefault();
                toast.success(modalMode === 'add' ? 'Student added successfully' : 'Student updated successfully');
                setShowModal(false);
              }}>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    defaultValue={selectedStudent?.name}
                    className="w-full px-4 py-2.5 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue={selectedStudent?.email}
                    className="w-full px-4 py-2.5 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Class</label>
                    <select
                      defaultValue={selectedStudent?.class || 'Grade 10'}
                      className="w-full px-4 py-2.5 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option>Grade 9</option>
                      <option>Grade 10</option>
                      <option>Grade 11</option>
                      <option>Grade 12</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      defaultValue={selectedStudent?.phone}
                      className="w-full px-4 py-2.5 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Fee Amount</label>
                    <input
                      type="number"
                      defaultValue={selectedStudent?.fees}
                      className="w-full px-4 py-2.5 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Status</label>
                    <select
                      defaultValue={selectedStudent?.status || 'pending'}
                      className="w-full px-4 py-2.5 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="paid">Paid</option>
                      <option value="pending">Pending</option>
                      <option value="overdue">Overdue</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-4 py-2.5 border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2.5 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors btn-animate"
                  >
                    {modalMode === 'add' ? 'Add Student' : 'Save Changes'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentsPage;
