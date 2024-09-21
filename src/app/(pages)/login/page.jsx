'use client'
import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../../../utils/AuthContext';

const login = () => {
  const router = useRouter();
  const { loginp } = useAuth();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/api/users/login", user);
      toast.success("Login success")
      loginp(user);
      router.push('/')
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("User doesn't exists or Password is Invalid");
      } else {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        {!loading ? "Login" : "Processing..."}
      </h2>

      {/* Email Input */}
      <div className="mb-6">
        <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Enter your email"
          className="mt-1 p-3 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
      </div>

      {/* Password Input */}
      <div className="mb-6">
        <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Enter your password"
          className="mt-1 p-3 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        type="submit"
        className={`w-full py-3 px-4 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition ${
          loading && "cursor-not-allowed"
        }`}
        disabled={loading}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <svg
              className="animate-spin h-5 w-5 mr-3 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
            Logging in...
          </div>
        ) : (
          "Login"
        )}
      </button>
    </div>
  );
}

export default login;