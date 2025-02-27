'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/context/AuthContext';
import { useForm } from 'react-hook-form';
import { USERS } from '@/lib/data/mockData';

export default function Login() {
  const { login } = useAuth();
  const router = useRouter();
  const [authError, setAuthError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { 
    register, 
    handleSubmit,
    formState: { errors } 
  } = useForm();
  
  const onSubmit = async (data) => {
    setIsLoading(true);
    setAuthError('');
    
    try {
      const user = await login(data.email, data.password);
      
      // Navigate to the appropriate dashboard based on user role
      if (user.role === 'business') {
        router.push('/business/dashboard');
      } else if (user.role === 'provider') {
        router.push('/provider/dashboard');
      } else if (user.role === 'government') {
        router.push('/government/dashboard');
      }
    } catch (error) {
      setAuthError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const loginAsDemo = async (role) => {
    setIsLoading(true);
    setAuthError('');
    
    const demoUser = USERS.find(user => user.role === role);
    
    try {
      if (demoUser) {
        await login(demoUser.email, demoUser.password);
        
        // Navigate to the appropriate dashboard based on user role
        if (role === 'business') {
          router.push('/business/dashboard');
        } else if (role === 'provider') {
          router.push('/provider/dashboard');
        } else if (role === 'government') {
          router.push('/government/dashboard');
        }
      }
    } catch (error) {
      setAuthError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-center text-3xl font-bold text-primary-600">
        ZestGoa
        </h1>
        <h2 className="mt-4 text-center text-2xl font-bold text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  {...register('password', { 
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters'
                    }
                  })}
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            {authError && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      {authError}
                    </h3>
                  </div>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with demo accounts
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3">
              <button
                type="button"
                disabled={isLoading}
                onClick={() => loginAsDemo('business')}
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Login as Business
              </button>
              <button
                type="button"
                disabled={isLoading}
                onClick={() => loginAsDemo('provider')}
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Login as Waste Collector
              </button>
              <button
                type="button"
                disabled={isLoading}
                onClick={() => loginAsDemo('government')}
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Login as Government
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}