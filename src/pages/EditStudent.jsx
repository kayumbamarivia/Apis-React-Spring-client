import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function EditStudent() {
  const [studentData, setStudentData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { studentId } = useParams();

  useEffect(() => {
    getStudentById();
  }, []);

  async function getStudentById() {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.get(`https://kayumba-jmv-java-spring-boot-backend-apis.onrender.com/api/student/${studentId}/get`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setStudentData(response.data);
    } catch (error) {
      console.error('Error fetching student:', error);
    }
  }

  const handleChange = (e) => {
    setStudentData({
      ...studentData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = sessionStorage.getItem("token");
      const res = await fetch(`https://kayumba-jmv-java-spring-boot-backend-apis.onrender.com/api/student/${studentId}/edit`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(studentData),
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
      <h1 className='text-3xl text-center font-semibold my-7'>Update Student</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='text'
          placeholder='First Name'
          className='border p-3 rounded-lg'
          id='firstName'
          value={studentData.firstName || ""}
          onChange={handleChange}
        />
        <input
          type='text'
          placeholder='Last Name'
          className='border p-3 rounded-lg'
          id='lastName'
          value={studentData.lastName || ""}
          onChange={handleChange}
        />
        <input
          type='email'
          placeholder='Email'
          className='border p-3 rounded-lg'
          id='email'
          value={studentData.email || ""}
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Update'}
        </button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Do you not want to Update a student ?</p>
        <Link to={'/home'}>
          <span className='text-blue-700'>Cancel</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
}
