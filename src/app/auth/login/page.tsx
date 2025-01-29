'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/utils/validationSchemas';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@/store/slices/authSlice';
import axiosInstance from '@/utils/axiosInstance';
import toast from 'react-hot-toast';
import { LoginRequest } from '@/types/auth';


const LoginPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  // 🛠️ Configuramos React Hook Form con Zod
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    resolver: zodResolver(loginSchema),
  });

  // 🛠️ Función de Login
  const onSubmit = async (data: LoginRequest) => {
    try {
      const response = await axiosInstance.post('/auth/login', data);

      const token = response.data;
      dispatch(setCredentials({ token }));
      localStorage.setItem('token', token);

      toast.success('Login successful! Redirecting...', { icon: '🚀' });
      setTimeout(() => router.push('/clients'), 1500);
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Invalid credentials. Please try again.');
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.85)), url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
      }}
    >
      <div className="w-full max-w-md bg-black bg-opacity-50 backdrop-blur-md p-8 rounded-lg shadow-xl border border-gray-700">
        <h1 className="text-4xl font-extrabold text-center text-red-500 mb-6">
          Welcome Back
        </h1>
        <p className="text-gray-300 text-center mb-6">
          Manage your gym with ease. Enter your details to continue.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-200">
              Email Address
            </label>
            <input
              {...register('email')}
              type="email"
              id="email"
              className="w-full px-4 py-3 bg-gray-900 text-white rounded-md border border-gray-600 focus:ring-2 focus:ring-red-600 focus:outline-none"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-200">
              Password
            </label>
            <input
              {...register('password')}
              type="password"
              id="password"
              className="w-full px-4 py-3 bg-gray-900 text-white rounded-md border border-gray-600 focus:ring-2 focus:ring-red-600 focus:outline-none"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 bg-red-600 text-white rounded-md font-semibold text-lg transition-transform duration-300 hover:bg-red-700 hover:scale-105"
          >
            Sign In
          </button>

          {/* Forgot Password */}
          <p className="text-center text-gray-400 text-sm">
            Forgot your password?{' '}
            <a href="#" className="text-red-500 hover:underline">
              Reset here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
