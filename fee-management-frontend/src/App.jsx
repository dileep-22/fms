import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import StudentList from './components/StudentList';
import FeeList from './components/FeeList';
import PaymentList from './components/PaymentList';
import './index.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/students" element={<StudentList />} />
            <Route path="/fees" element={<FeeList />} />
            <Route path="/payments" element={<PaymentList />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
