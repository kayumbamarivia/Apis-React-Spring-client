import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Search() {
  const [listings, setListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');

    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }

    const fetchListings = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const data = { "userId": currentUser.id, "searchTerm": `${searchTermFromUrl}` };
        const apiUrl1 = `https://kayumba-jmv-java-spring-boot-backend-apis.onrender.com/api/students/search?searchTerm=${searchTermFromUrl}`;
        const apiUrl2 = `https://kayumba-jmv-java-spring-boot-backend-apis.onrender.com/api/student/search?searchTerm=${searchTermFromUrl}&userId=${currentUser.id}`;
        if (currentUser.role === 'SUPERUSER' || currentUser.role === 'ADMIN') {
          const res = await axios.get(apiUrl1,{
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          setListings(res.data);
          
        } else if (currentUser.role === 'USER') {
          const res = await axios.post(apiUrl2,data,{
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          setListings(res.data);
        }
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    if (searchTermFromUrl) {
      fetchListings();
    }
  }, [location.search, currentUser.id]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
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
          Searching results:
        </h1>
        <div className='p-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {listings.length === 0 && (
            <p className='text-xl text-gray-800'>No students(s) found!</p>
          )}
          {listings.map((student) => (
            <div key={student.id} className='border p-3 rounded-lg shadow-md'>
              <p className='text-lg font-semibold text-gray-800'>ID: {student.id}</p>
              <p className='text-gray-600'>First Name: {student.firstName}</p>
              <p className='text-gray-600'>Last Name: {student.lastName}</p>
              <p className='text-gray-600'>Email: {student.email}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}