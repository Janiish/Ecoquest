/**
 * Login Page - User authentication form
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Implement authentication logic
    console.log('Login with:', { email, password });
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-eco-50 to-eco-100 px-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="rounded-lg bg-white p-8 shadow-lg">
          <h1 className="mb-2 text-center text-2xl font-bold text-eco-900">
            Welcome Back
          </h1>
          <p className="mb-6 text-center text-sm text-gray-600">
            Sign in to your EcoQuest account
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="mt-2 w-full rounded-md border-2 border-gray-300 px-4 py-2 text-sm focus:border-eco-500 focus:outline-none"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="mt-2 w-full rounded-md border-2 border-gray-300 px-4 py-2 text-sm focus:border-eco-500 focus:outline-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-md bg-eco-500 px-4 py-2 font-semibold text-white transition-colors hover:bg-eco-600 disabled:opacity-50"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 border-t border-gray-300" />

          {/* Sign Up Link */}
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/quests')}
              className="cursor-pointer border-none bg-none font-semibold text-eco-500 hover:underline"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
