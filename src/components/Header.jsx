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
      <div className='container mx-auto px-4 py-4 md:py-6 flex flex-wrap items-center justify-between'>
        <Link to='/' className='text-2xl font-bold text-gray-800'>
          <span className='text-indigo-500'>Kayumba</span>
          <span className='text-indigo-700 ml-1'>@SHINE</span>
        </Link>
        <form onSubmit={handleSubmit} className='flex items-center mt-4 md:mt-0'>
          <input
            type='text'
            placeholder='Search...'
            className='px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="px-4 py-2 ml-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600">
            <FaSearch />
          </button>
        </form>
        <nav className='flex flex-wrap items-center gap-4 mt-4 md:mt-0'>
          <Link to='/' className='text-gray-800 hover:text-indigo-600'>Home</Link>
          <Link to='/about' className='text-gray-800 hover:text-indigo-600'>About</Link>
        </nav>
      </div>
    </header>
  );
}
