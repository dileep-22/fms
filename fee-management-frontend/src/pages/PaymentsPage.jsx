import { useState } from 'react';
import { Search, Plus, Edit2, Trash2, Eye, X, Download } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const PaymentsPage = () => {
  const toast = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMethod, setFilterMethod] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showModal, setShowModal] = useState(false);

  const paymentMethods = ['all', 'Cash', 'Card', 'UPI', 'Bank Transfer', 'Check'];
  const statuses = ['all', 'Success', 'Pending', 'Failed'];

  const [payments] = useState([
    { id: 1, student: 'John Doe', class: 'Grade 10', amount: 1500, method: 'UPI', status: 'Success', date: '2024-01-15', transactionId: 'TXN001' },
    { id: 2, student: 'Jane Smith', class: 'Grade 9', amount: 1500, method: 'Card', status: 'Pending', date: '2024-01-14', transactionId: 'TXN002' },
    { id: 3, student: 'Mike Johnson', class: 'Grade 11', amount: 1800, method: 'Cash', status: 'Success', date: '2024-01-14', transactionId: 'TXN003' },
    { id: 4, student: 'Emily Davis', class: 'Grade 10', amount: 1500, method: 'Bank Transfer', status: 'Failed', date: '2024-01-13', transactionId: 'TXN004' },
    { id: 5, student: 'Chris Wilson', class: 'Grade 12', amount: 2000, method: 'UPI', status: 'Success', date: '2024-01-12', transactionId: 'TXN005' },
    { id: 6, student: 'Sarah Brown', class: 'Grade 9', amount: 1500, method: 'Check', status: 'Success', date: '2024-01-11', transactionId: 'TXN006' },
  ]);

  const [paymentData] = useState([
    { method: 'Cash', count: 45, color: '#22c55e' },
    { method: 'Card', count: 32, color: '#3b82f6' },
    { method: 'UPI', count: 78, color: '#8b5cf6' },
    { method: 'Transfer', count: 25, color: '#f59e0b' },
    { method: 'Check', count: 15, color: '#ec4899' },
  ]);

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMethod = filterMethod === 'all' || payment.method === filterMethod;
    const matchesStatus = filterStatus === 'all' || payment.status === filterStatus;
    return matchesSearch && matchesMethod && matchesStatus;
  });

  const handleAddPayment = () => {
    setShowModal(true);
  };

  const handleDelete = (payment) => {
    if (window.confirm(`Are you sure you want to delete this payment?`)) {
      toast.success('Payment record deleted successfully');
    }
  };

  const getMethodIcon = (method) => {
    const icons = {
      'Cash': '💵',
      'Card': '💳',
      'UPI': '📱',
      'Bank Transfer': '🏦',
      'Check': '📝'
    };
    return icons[method] || '💰';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Payments</h1>
          <p className="text-neutral-500 mt-1">Record and track fee payments</p>
        </div>
        <button
          onClick={handleAddPayment}
          className="flex items-center justify-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-xl hover:bg-primary-700 transition-all btn-animate shadow-lg shadow-primary-500/30"
        >
          <Plus className="w-5 h-5" />
          Record Payment
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm">
          <p className="text-sm text-neutral-500 font-medium">Total Received</p>
          <h3 className="text-2xl font-bold text-green-600 mt-2">$98,450</h3>
          <p className="text-xs text-green-600 mt-1">↑ 12% from last month</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm">
          <p className="text-sm text-neutral-500 font-medium">Pending</p>
          <h3 className="text-2xl font-bold text-yellow-600 mt-2">$12,300</h3>
          <p className="text-xs text-yellow-600 mt-1">↓ 5% from last month</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm">
          <p className="text-sm text-neutral-500 font-medium">Failed</p>
          <h3 className="text-2xl font-bold text-red-600 mt-2">$3,250</h3>
          <p className="text-xs text-red-600 mt-1">↑ 2% from last month</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm">
          <p className="text-sm text-neutral-500 font-medium">Today's Collection</p>
          <h3 className="text-2xl font-bold text-primary-600 mt-2">$4,500</h3>
          <p className="text-xs text-neutral-500 mt-1">12 transactions</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">Payment Methods Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={paymentData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={90}
                paddingAngle={5}
                dataKey="count"
                label={({ method, count }) => `${method}: ${count}`}
              >
                {paymentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">Monthly Collection Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={[
              { month: 'Jan', amount: 12500 },
              { month: 'Feb', amount: 15800 },
              { month: 'Mar', amount: 18200 },
              { month: 'Apr', amount: 14600 },
              { month: 'May', amount: 19800 },
              { month: 'Jun', amount: 22400 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5e5" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#737373' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#737373' }} tickFormatter={(value) => `$${value/1000}k`} />
              <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']} />
              <Bar dataKey="amount" fill="#5b6cf9" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 border border-neutral-100 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search by student or transaction ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterMethod}
            onChange={(e) => setFilterMethod(e.target.value)}
            className="px-4 py-2.5 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
          >
            <option value="all">All Methods</option>
            {paymentMethods.filter(m => m !== 'all').map(method => (
              <option key={method} value={method}>{getMethodIcon(method)} {method}</option>
            ))}
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2.5 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
          >
            <option value="all">All Status</option>
            {statuses.filter(s => s !== 'all').map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50">
              <tr>
                <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-6 py-3">Student</th>
                <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-6 py-3">Transaction ID</th>
                <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-6 py-3">Amount</th>
                <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-6 py-3">Method</th>
                <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-6 py-3">Status</th>
                <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-6 py-3">Date</th>
                <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mb-4">
                        <Search className="w-8 h-8 text-neutral-400" />
                      </div>
                      <p className="text-neutral-600 font-medium">No payments found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredPayments.map((payment) => (
                  <tr key={payment.id} className="table-row-hover">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-medium">
                          {payment.student.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-medium text-neutral-900">{payment.student}</p>
                          <p className="text-sm text-neutral-500">{payment.class}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-mono text-sm text-neutral-600">{payment.transactionId}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-bold text-neutral-900">
                      ${payment.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="flex items-center gap-2 text-neutral-700">
                        <span>{getMethodIcon(payment.method)}</span>
                        <span>{payment.method}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                        payment.status === 'Success' ? 'bg-green-100 text-green-700' :
                        payment.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-neutral-500 text-sm">
                      {new Date(payment.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors text-blue-600">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-yellow-50 rounded-lg transition-colors text-yellow-600">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(payment)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600"
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

      {/* Add Payment Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl w-full max-w-lg animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b border-neutral-100">
              <h2 className="text-xl font-bold text-neutral-900">Record Payment</h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-neutral-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form className="p-6 space-y-4" onSubmit={(e) => {
              e.preventDefault();
              toast.success('Payment recorded successfully');
              setShowModal(false);
            }}>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Select Student</label>
                <select className="w-full px-4 py-2.5 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500" required>
                  <option value="">Choose a student...</option>
                  <option>John Doe - Grade 10</option>
                  <option>Jane Smith - Grade 9</option>
                  <option>Mike Johnson - Grade 11</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Amount</label>
                <input type="number" className="w-full px-4 py-2.5 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="Enter amount" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Payment Method</label>
                  <select className="w-full px-4 py-2.5 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500" required>
                    <option value="">Select method...</option>
                    <option>Cash</option>
                    <option>Card</option>
                    <option>UPI</option>
                    <option>Bank Transfer</option>
                    <option>Check</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Date</label>
                  <input type="date" className="w-full px-4 py-2.5 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Transaction ID (Optional)</label>
                <input type="text" className="w-full px-4 py-2.5 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="Auto-generated if empty" />
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-2.5 border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-2.5 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors btn-animate">Record Payment</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentsPage;
