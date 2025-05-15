import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const Welcome: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ name: '', email: '', password: '' });

  const navigate = useNavigate();

  // Handlers for login
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  // Handlers for signup
  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupData),
      });
      const data = await res.json();
      console.log('Signup successful:', data);
    } catch (err) {
      console.error('Signup error:', err);
    }
  };

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        navigate('/dashboard');
      }
    }, [navigate]);
  
  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-xl shadow-lg bg-white">
      <div className="flex justify-around mb-6">
        <button
          className={`px-4 py-2 font-semibold ${activeTab === 'login' ? 'border-b-2 border-blue-500' : ''}`}
          onClick={() => setActiveTab('login')}
        >
          Login
        </button>
        <button
          className={`px-4 py-2 font-semibold ${activeTab === 'signup' ? 'border-b-2 border-blue-500' : ''}`}
          onClick={() => setActiveTab('signup')}
        >
          Sign Up
        </button>
      </div>

      {activeTab === 'login' && (
        <div className="space-y-4">
          {/* Social Logins */}
          <button className="w-full bg-red-500 text-white py-2 rounded">Login with Google</button>
          <button className="w-full bg-blue-600 text-white py-2 rounded">Login with Facebook</button>
          <button className="w-full bg-gray-800 text-white py-2 rounded">Login with GitHub</button>

          {/* Divider */}
          <div className="text-center text-gray-400">or</div>

          {/* Email/Password Login */}
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleLoginChange}
              placeholder="Email"
              className="w-full border px-4 py-2 rounded"
              required
            />
            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleLoginChange}
              placeholder="Password"
              className="w-full border px-4 py-2 rounded"
              required
            />
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Login</button>
          </form>
        </div>
      )}

      {activeTab === 'signup' && (
        <form onSubmit={handleSignupSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={signupData.name}
            onChange={handleSignupChange}
            placeholder="Name"
            className="w-full border px-4 py-2 rounded"
            required
          />
          <input
            type="email"
            name="email"
            value={signupData.email}
            onChange={handleSignupChange}
            placeholder="Email"
            className="w-full border px-4 py-2 rounded"
            required
          />
          <input
            type="password"
            name="password"
            value={signupData.password}
            onChange={handleSignupChange}
            placeholder="Password"
            className="w-full border px-4 py-2 rounded"
            required
          />
          <button type="submit" className="w-full bg-green-500 text-white py-2 rounded">Sign Up</button>
        </form>
      )}
    </div>
  );
};

export default Welcome;
