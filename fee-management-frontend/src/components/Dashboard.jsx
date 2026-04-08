import React, { useState, useEffect } from 'react';
import { studentApi, feeApi, paymentApi } from '../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalFees: 0,
    totalPaid: 0,
    totalPending: 0,
    totalOverdue: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [studentsRes, feesRes, paymentsRes] = await Promise.all([
        studentApi.getAll(),
        feeApi.getAll(),
        paymentApi.getAll(),
      ]);

      const students = studentsRes.data;
      const fees = feesRes.data;
      const payments = paymentsRes.data;

      const totalPaid = fees
        .filter((fee) => fee.status === 'PAID')
        .reduce((sum, fee) => sum + fee.amount, 0);

      const totalPending = fees
        .filter((fee) => fee.status === 'PENDING')
        .reduce((sum, fee) => sum + fee.amount, 0);

      const totalOverdue = fees
        .filter((fee) => fee.status === 'OVERDUE')
        .reduce((sum, fee) => sum + fee.amount, 0);

      setStats({
        totalStudents: students.length,
        totalFees: fees.length,
        totalPaid: totalPaid,
        totalPending: totalPending,
        totalOverdue: totalOverdue,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  return (
    <div className="container">
      <h2>Dashboard</h2>
      <div className="dashboard-grid">
        <div className="stat-card stat-primary">
          <h3>Total Students</h3>
          <p className="stat-value">{stats.totalStudents}</p>
        </div>
        <div className="stat-card stat-success">
          <h3>Total Fees</h3>
          <p className="stat-value">{stats.totalFees}</p>
        </div>
        <div className="stat-card stat-info">
          <h3>Total Paid</h3>
          <p className="stat-value">${stats.totalPaid.toFixed(2)}</p>
        </div>
        <div className="stat-card stat-warning">
          <h3>Total Pending</h3>
          <p className="stat-value">${stats.totalPending.toFixed(2)}</p>
        </div>
        <div className="stat-card stat-danger">
          <h3>Total Overdue</h3>
          <p className="stat-value">${stats.totalOverdue.toFixed(2)}</p>
        </div>
      </div>

      <div className="quick-links">
        <h3>Quick Actions</h3>
        <div className="quick-links-grid">
          <a href="/students" className="quick-link-btn">
            Manage Students
          </a>
          <a href="/fees" className="quick-link-btn">
            Manage Fees
          </a>
          <a href="/payments" className="quick-link-btn">
            Record Payments
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
