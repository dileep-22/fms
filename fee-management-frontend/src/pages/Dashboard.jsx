import { useState, useEffect } from 'react';
import { DollarSign, Users, TrendingUp, TrendingDown, Calendar, ArrowRight } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalCollected: 125750,
    pendingPayments: 18500,
    totalStudents: 342,
    overdueFees: 8200
  });

  const [monthlyData] = useState([
    { month: 'Jan', collected: 12500, pending: 3200 },
    { month: 'Feb', collected: 15800, pending: 2800 },
    { month: 'Mar', collected: 18200, pending: 4100 },
    { month: 'Apr', collected: 14600, pending: 3500 },
    { month: 'May', collected: 19800, pending: 2900 },
    { month: 'Jun', collected: 22400, pending: 3800 },
    { month: 'Jul', collected: 22450, pending: 1700 },
  ]);

  const [feeDistribution] = useState([
    { name: 'Paid', value: 285, color: '#22c55e' },
    { name: 'Pending', value: 42, color: '#eab308' },
    { name: 'Overdue', value: 15, color: '#ef4444' },
  ]);

  const [recentTransactions] = useState([
    { id: 1, student: 'John Doe', class: 'Grade 10', amount: 1500, status: 'paid', date: '2024-01-15' },
    { id: 2, student: 'Jane Smith', class: 'Grade 9', amount: 1500, status: 'pending', date: '2024-01-14' },
    { id: 3, student: 'Mike Johnson', class: 'Grade 11', amount: 1800, status: 'paid', date: '2024-01-14' },
    { id: 4, student: 'Emily Davis', class: 'Grade 10', amount: 1500, status: 'overdue', date: '2024-01-13' },
    { id: 5, student: 'Chris Wilson', class: 'Grade 12', amount: 2000, status: 'paid', date: '2024-01-12' },
  ]);

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const StatCard = ({ title, value, icon: Icon, trend, trendValue, color }) => (
    <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm card-hover">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-neutral-500 font-medium">{title}</p>
          <h3 className="text-2xl font-bold text-neutral-900 mt-2">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </h3>
          {trend && (
            <div className={`flex items-center gap-1 mt-2 text-sm ${
              trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {trend === 'up' ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span>{trendValue}% from last month</span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-neutral-100">
              <div className="skeleton h-4 w-24 mb-4 rounded"></div>
              <div className="skeleton h-8 w-32 mb-2 rounded"></div>
              <div className="skeleton h-4 w-40 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Dashboard</h1>
          <p className="text-neutral-500 mt-1">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-neutral-500 bg-white px-4 py-2 rounded-xl border border-neutral-200">
          <Calendar className="w-4 h-4" />
          <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Collected"
          value={`$${stats.totalCollected.toLocaleString()}`}
          icon={DollarSign}
          trend="up"
          trendValue="12.5"
          color="bg-gradient-to-br from-green-500 to-green-600"
        />
        <StatCard
          title="Pending Payments"
          value={`$${stats.pendingPayments.toLocaleString()}`}
          icon={Calendar}
          trend="down"
          trendValue="8.2"
          color="bg-gradient-to-br from-yellow-500 to-yellow-600"
        />
        <StatCard
          title="Total Students"
          value={stats.totalStudents}
          icon={Users}
          trend="up"
          trendValue="5.3"
          color="bg-gradient-to-br from-blue-500 to-blue-600"
        />
        <StatCard
          title="Overdue Fees"
          value={`$${stats.overdueFees.toLocaleString()}`}
          icon={TrendingDown}
          trend="down"
          trendValue="15.7"
          color="bg-gradient-to-br from-red-500 to-red-600"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Collection Chart */}
        <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">Monthly Fee Collection</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5e5" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#737373' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#737373' }} tickFormatter={(value) => `$${value/1000}k`} />
              <Tooltip
                contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e5e5', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                formatter={(value) => [`$${value.toLocaleString()}`, '']}
              />
              <Bar dataKey="collected" fill="#5b6cf9" radius={[8, 8, 0, 0]} name="Collected" />
              <Bar dataKey="pending" fill="#fbbf24" radius={[8, 8, 0, 0]} name="Pending" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Fee Distribution Pie Chart */}
        <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">Fee Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={feeDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {feeDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-4">
            {feeDistribution.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm text-neutral-600">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-neutral-100">
          <h3 className="text-lg font-semibold text-neutral-900">Recent Transactions</h3>
          <button className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1 btn-animate">
            View All
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50">
              <tr>
                <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-6 py-3">Student</th>
                <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-6 py-3">Class</th>
                <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-6 py-3">Amount</th>
                <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-6 py-3">Status</th>
                <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-6 py-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {recentTransactions.map((transaction) => (
                <tr key={transaction.id} className="table-row-hover">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-sm font-medium">
                        {transaction.student.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="font-medium text-neutral-900">{transaction.student}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-neutral-600">{transaction.class}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-neutral-900">
                    ${transaction.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                      transaction.status === 'paid' ? 'bg-green-100 text-green-700' :
                      transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-neutral-500 text-sm">
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button className="flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all btn-animate shadow-lg shadow-primary-500/30">
          <DollarSign className="w-5 h-5" />
          <span className="font-medium">Record Payment</span>
        </button>
        <button className="flex items-center justify-center gap-3 p-4 bg-white border-2 border-dashed border-neutral-300 text-neutral-700 rounded-xl hover:border-primary-500 hover:text-primary-600 transition-all btn-animate">
          <Users className="w-5 h-5" />
          <span className="font-medium">Add Student</span>
        </button>
        <button className="flex items-center justify-center gap-3 p-4 bg-white border-2 border-dashed border-neutral-300 text-neutral-700 rounded-xl hover:border-primary-500 hover:text-primary-600 transition-all btn-animate">
          <TrendingUp className="w-5 h-5" />
          <span className="font-medium">Generate Report</span>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
