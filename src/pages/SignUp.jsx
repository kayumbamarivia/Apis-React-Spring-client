import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Your form validation logic here
      if (!formData.name || !formData.email || !formData.password || !formData.role) {
        setError("All fields are required.");
        setLoading(false);
        return;
      }

      const res = await fetch('https://java-spring-boot-backend-apis.onrender.com/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!res.ok) {
        const data = await res.json();
        setError(data.message);
        setLoading(false);
        return;
      }

      setLoading(false);
      setError(null);
      // Redirect to a success page or show a success message
      navigate('/');
    } catch (error) {
      setLoading(false);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-3xl font-semibold my-4'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 max-w-md w-full'>
        <input
          type='text'
          placeholder='Username'
          className='border p-3 rounded-lg'
          id='name'
          onChange={handleChange}
        />
        <input
          type='email'
          placeholder='Email'
          className='border p-3 rounded-lg'
          id='email'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='Password'
          className='border p-3 rounded-lg'
          id='password'
          onChange={handleChange}
        />
        <select
          id='role'
          className='border p-3 rounded-lg'
          onChange={handleChange}
        >
          <option value=''>Select Role</option>
          <option value='admin'>Admin</option>
          <option value='guest'>Guest</option>
        </select>
        <button
          disabled={loading}
          className='bg-blue-500 text-white p-3 rounded-lg uppercase hover:bg-blue-700 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
      </form>
      <div className='mt-4'>
        <p className='text-gray-600'>Already have an account? <Link to={'/'} className='text-blue-700'>Login</Link></p>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
}
