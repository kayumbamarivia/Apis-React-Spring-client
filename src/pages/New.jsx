import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function New() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = sessionStorage.getItem("token");
      const res = await fetch(`https://kayumba-jmv-java-spring-boot-backend-apis.onrender.com/api/student/${currentUser.id}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/home');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Student Registration</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='text'
          placeholder='First Name'
          className='border p-3 rounded-lg'
          id='firstName'
          onChange={handleChange}
        />
        <input
          type='text'
          placeholder='Last Name'
          className='border p-3 rounded-lg'
          id='lastName'
          onChange={handleChange}
        />
        <input
          type='email'
          placeholder='Email'
          className='border p-3 rounded-lg'
          id='email'
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Add'}
        </button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>You do not want to create a Student?</p>
        <Link to={'/home'}>
          <span className='text-blue-700'>Cancel</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
}
