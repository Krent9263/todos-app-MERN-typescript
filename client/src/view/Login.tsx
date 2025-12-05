import React, { useState } from 'react';
import {  Link } from 'react-router-dom';
import { User, Lock } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password });
    // let response = await login(email, password);
    // console.log('Login response:', response);
  };

  return (
  <div className="min-h-screen w-full flex items-center justify-center bg-gray-400 px-4">
    <div className="bg-gray-300 rounded-2xl shadow-2xl w-full max-w-md px-8 py-10 md:px-10 overflow-hidden relative">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-gray-800">Login</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Email Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-600 block" htmlFor="email">
            Email
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-0 pointer-events-none">
              <User className="h-5 w-5 text-gray-400 group-focus-within:text-black transition-colors" />
            </div>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-2 pl-8 pr-4 text-gray-700 bg-transparent border-b border-gray-300 focus:border-black focus:outline-none transition-colors placeholder-gray-400"
              placeholder="Type your email"
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-600 block" htmlFor="password">
            Password
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-0 pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-black transition-colors" />
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full py-2 pl-8 pr-4 text-gray-700 bg-transparent border-b border-gray-300 focus:border-black focus:outline-none transition-colors placeholder-gray-400"
              placeholder="Type your password"
            />
          </div>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-black text-white font-bold py-3 px-4 rounded-full pointer-coarse:active:bg-gray-800 hover:bg-gray-700 transition-colors cursor-pointer"
        >
          LOGIN
        </button>
      </form>
      {/* Bottom Sign Up Link */}
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>
          Or Sign Up Using <Link to="/register" className="text-blue-600 hover:underline">Sign Up</Link>
        </p>
      </div>

    </div>
    </div>
  );
};

export default Login;