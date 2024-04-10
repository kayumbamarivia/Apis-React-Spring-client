import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Header() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== '') {
      window.location.href = `/search?searchTerm=${encodeURIComponent(searchTerm)}`;
    }
  };

  return (
    <header className='bg-gray-200 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto px-4 py-3'>
        <Link to='/'>
          <h1 className='font-bold text-xl text-gray-800 flex items-center'>
            <span className='text-indigo-500'>Kayumba</span>
            <span className='text-indigo-700 ml-1'>Estate</span>
          </h1>
        </Link>
        <form onSubmit={handleSubmit} className='bg-white p-3 rounded-lg flex items-center'>
          <input
            type='text'
            placeholder='Search...'
            className='bg-transparent focus:outline-none w-24 sm:w-64 text-gray-800'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="ml-2">
            <FaSearch className='text-gray-600' />
          </button>
        </form>
        <ul className='flex gap-4'>
          <li className='text-gray-800 hover:text-indigo-600'>
            <Link to='/'>Home</Link>
          </li>
          <li className='text-gray-800 hover:text-indigo-600'>
            <Link to='/about'>About</Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
