import axios from 'axios';

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Search() {
  const [listings, setListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');

    const fetchListings = async () => {
      try {
        const res = await fetch(`https://java-spring-boot-backend-apis.onrender.com/api/students/search?searchTerm=${searchTermFromUrl}`);
        const data = await res.json();
        setListings(data);
        console.log(students);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
      fetchListings();
    }
  }, []);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', searchTerm);
    window.location.href = `/search?${urlParams.toString()}`;
  };

  useEffect(() => {
    (async () => await Load())();
}, []);

async function Load() {
    const response = await axios.get(
        "https://java-spring-boot-backend-apis.onrender.com/api/students"
    );
    setStudents(response.data.flat());
    console.log(response.data.flat());
}

  async function deleteStudentById(id) {
    try {
      await axios.delete(`https://java-spring-boot-backend-apis.onrender.com/api/students/${id}/delete`);
      alert('User Deleted Successfully!!');
      Load();
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  }

  return (
    <div className='flex flex-col md:flex-row'>
      <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <label htmlFor='searchTerm' className='text-lg font-semibold'>
            Search Term:
          </label>
          <div className='flex items-center'>
            <input
              type='text'
              id='searchTerm'
              placeholder='Search...'
              className='border rounded-lg p-3 w-full focus:outline-none'
              value={searchTerm}
              onChange={handleChange}
            />
            <button className='bg-blue-500 text-white p-3 rounded-lg ml-2 hover:bg-blue-600 focus:outline-none'>
              Search
            </button>
          </div>
        </form>
      </div>
      <div className='flex-1'>
        <h1 className='text-3xl font-semibold border-b p-3 text-gray-800 mt-5'>
          Listing results:
        </h1>
        <div className='p-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {listings.length === 0 && (
            <p className='text-xl text-gray-800'>No listings found!</p>
          )}
          {listings.map((student) => (
            <div key={student.id} className='border p-3 rounded-lg shadow-md'>
              <p className='text-lg font-semibold text-gray-800'>ID: {student.id}</p>
              <p className='text-gray-600'>First Name: {student.firstName}</p>
              <p className='text-gray-600'>Last Name: {student.lastName}</p>
              <p className='text-gray-600'>Email: {student.email}</p>
              <div className='flex mt-2'>
                <Link to={`/${student.id}/get`} className='text-blue-600 hover:underline mr-2'>
                  View
                </Link>
                <Link to={`/${student.id}/edit`} className='text-blue-600 hover:underline mr-2'>
                  Edit
                </Link>
                <button
                  type='button'
                  className='text-red-600 hover:underline'
                  onClick={() => deleteStudentById(student.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
