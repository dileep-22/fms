import { useState } from 'react';
import { Download, FileText, Calendar, Filter, X } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const ReportsPage = () => {
  const toast = useToast();
  const [dateRange, setDateRange] = useState('this-month');
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const reportData = [
    { month: 'Jan', collected: 12500, pending: 3200, overdue: 800 },
    { month: 'Feb', collected: 15800, pending: 2800, overdue: 650 },
    { month: 'Mar', collected: 18200, pending: 4100, overdue: 920 },
    { month: 'Apr', collected: 14600, pending: 3500, overdue: 780 },
    { month: 'May', collected: 19800, pending: 2900, overdue: 540 },
    { month: 'Jun', collected: 22400, pending: 3800, overdue: 890 },
  ];

  const classWiseData = [
    { name: 'Grade 9', collected: 28500, students: 85 },
    { name: 'Grade 10', collected: 32400, students: 92 },
    { name: 'Grade 11', collected: 29800, students: 78 },
    { name: 'Grade 12', collected: 35600, students: 87 },
  ];

  const statusDistribution = [
    { name: 'Paid', value: 285, color: '#22c55e' },
    { name: 'Pending', value: 42, color: '#eab308' },
    { name: 'Overdue', value: 15, color: '#ef4444' },
  ];

  const recentReports = [
    { id: 1, name: 'Monthly Collection Report - January 2024', date: '2024-01-31', type: 'PDF', size: '2.4 MB' },
    { id: 2, name: 'Student Fee Status Report', date: '2024-01-30', type: 'Excel', size: '1.8 MB' },
    { id: 3, name: 'Overdue Fees Report - Q4 2023', date: '2024-01-28', type: 'PDF', size: '3.1 MB' },
    { id: 4, name: 'Class-wise Collection Summary', date: '2024-01-25', type: 'CSV', size: '0.5 MB' },
  ];

  const handleDownload = (format) => {
    toast.info(`Generating ${format.toUpperCase()} report...`);
    setTimeout(() => {
      toast.success(`${format.toUpperCase()} report downloaded successfully`);
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Reports</h1>
          <p className="text-neutral-500 mt-1">Generate and download fee reports</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2.5 border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors"
          >
            <Filter className="w-4 h-4" />
            Filters
          </button>
          <button
            onClick={() => handleDownload('pdf')}
            className="flex items-center gap-2 bg-primary-600 text-white px-6 py-2.5 rounded-xl hover:bg-primary-700 transition-all btn-animate shadow-lg shadow-primary-500/30"
          >
            <Download className="w-4 h-4" />
            Export All
          </button>
        </div>
      </div>

      {/* Quick Filters */}
      {showFilters && (
        <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm animate-slide-up">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-neutral-900">Filter Reports</h3>
            <button onClick={() => setShowFilters(false)} className="p-2 hover:bg-neutral-100 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Date Range</label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full px-4 py-2.5 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
              >
                <option value="today">Today</option>
                <option value="this-week">This Week</option>
                <option value="this-month">This Month</option>
                <option value="last-month">Last Month</option>
                <option value="this-quarter">This Quarter</option>
                <option value="this-year">This Year</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Class</label>
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full px-4 py-2.5 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
              >
                <option value="all">All Classes</option>
                <option value="9">Grade 9</option>
                <option value="10">Grade 10</option>
                <option value="11">Grade 11</option>
                <option value="12">Grade 12</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Payment Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-2.5 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
              >
                <option value="all">All Status</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3 mt-4 pt-4 border-t border-neutral-100">
            <button className="px-4 py-2.5 border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors">
              Reset Filters
            </button>
            <button className="px-4 py-2.5 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors btn-animate">
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
              <FileText className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-neutral-500">Total Collected</p>
              <h3 className="text-xl font-bold text-neutral-900">$103,300</h3>
            </div>
          </div>
          <p className="text-xs text-green-600">↑ 15% vs previous period</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-neutral-500">Pending Amount</p>
              <h3 className="text-xl font-bold text-neutral-900">$20,300</h3>
            </div>
          </div>
          <p className="text-xs text-yellow-600">↓ 8% vs previous period</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
              <FileText className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-neutral-500">Overdue Amount</p>
              <h3 className="text-xl font-bold text-neutral-900">$4,580</h3>
            </div>
          </div>
          <p className="text-xs text-red-600">↑ 3% vs previous period</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-neutral-500">Collection Rate</p>
              <h3 className="text-xl font-bold text-neutral-900">83.5%</h3>
            </div>
          </div>
          <p className="text-xs text-blue-600">↑ 5% vs previous period</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Collection Trend */}
        <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-neutral-900">Collection Trend</h3>
            <button onClick={() => handleDownload('trend')} className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={reportData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5e5" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#737373' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#737373' }} tickFormatter={(value) => `$${value/1000}k`} />
              <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, '']} />
              <Line type="monotone" dataKey="collected" stroke="#22c55e" strokeWidth={3} dot={{ fill: '#22c55e', strokeWidth: 2 }} name="Collected" />
              <Line type="monotone" dataKey="pending" stroke="#eab308" strokeWidth={3} dot={{ fill: '#eab308', strokeWidth: 2 }} name="Pending" />
              <Line type="monotone" dataKey="overdue" stroke="#ef4444" strokeWidth={3} dot={{ fill: '#ef4444', strokeWidth: 2 }} name="Overdue" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Class-wise Performance */}
        <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-neutral-900">Class-wise Collection</h3>
            <button onClick={() => handleDownload('classwise')} className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={classWiseData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5e5" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#737373' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#737373' }} tickFormatter={(value) => `$${value/1000}k`} />
              <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']} />
              <Bar dataKey="collected" fill="#5b6cf9" radius={[8, 8, 0, 0]} name="Collected" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Status Distribution */}
      <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-neutral-900">Fee Status Overview</h3>
          <button onClick={() => handleDownload('status')} className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={statusDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {statusDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-col justify-center space-y-4">
            {statusDistribution.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="font-medium text-neutral-900">{item.name}</span>
                </div>
                <div className="text-right">
                  <p className="font-bold text-neutral-900">{item.value}</p>
                  <p className="text-xs text-neutral-500">students</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-neutral-100">
          <h3 className="text-lg font-semibold text-neutral-900">Recent Reports</h3>
        </div>
        <div className="divide-y divide-neutral-100">
          {recentReports.map((report) => (
            <div key={report.id} className="flex items-center justify-between p-4 hover:bg-neutral-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  report.type === 'PDF' ? 'bg-red-100' :
                  report.type === 'Excel' ? 'bg-green-100' :
                  'bg-blue-100'
                }`}>
                  <FileText className={`w-5 h-5 ${
                    report.type === 'PDF' ? 'text-red-600' :
                    report.type === 'Excel' ? 'text-green-600' :
                    'text-blue-600'
                  }`} />
                </div>
                <div>
                  <p className="font-medium text-neutral-900">{report.name}</p>
                  <p className="text-sm text-neutral-500">{report.date} • {report.size}</p>
                </div>
              </div>
              <button
                onClick={() => handleDownload(report.type.toLowerCase())}
                className="flex items-center gap-2 px-4 py-2 text-sm text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Generate Custom Report */}
      <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-6 border border-primary-200">
        <h3 className="text-lg font-semibold text-primary-900 mb-4">Generate Custom Report</h3>
        <p className="text-sm text-primary-700 mb-4">Create a customized report with specific parameters and filters.</p>
        <div className="flex flex-wrap gap-3">
          <button onClick={() => handleDownload('custom-pdf')} className="flex items-center gap-2 px-4 py-2.5 bg-white text-primary-700 rounded-xl hover:bg-primary-50 transition-colors border border-primary-200">
            <FileText className="w-4 h-4" />
            PDF Report
          </button>
          <button onClick={() => handleDownload('custom-excel')} className="flex items-center gap-2 px-4 py-2.5 bg-white text-green-700 rounded-xl hover:bg-green-50 transition-colors border border-green-200">
            <FileText className="w-4 h-4" />
            Excel Report
          </button>
          <button onClick={() => handleDownload('custom-csv')} className="flex items-center gap-2 px-4 py-2.5 bg-white text-blue-700 rounded-xl hover:bg-blue-50 transition-colors border border-blue-200">
            <FileText className="w-4 h-4" />
            CSV Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
