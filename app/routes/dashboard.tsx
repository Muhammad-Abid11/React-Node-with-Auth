import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div>
      <nav className="flex justify-between items-center p-4 bg-blue-500 text-white">
        <span className="font-bold">My App</span>
        <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
      </nav>
      <div className="p-8">
        <h1 className="text-2xl font-bold">Welcome to the Dashboard!</h1>
        {/* Protected content goes here */}
      </div>
    </div>
  );
};

export default Dashboard;
