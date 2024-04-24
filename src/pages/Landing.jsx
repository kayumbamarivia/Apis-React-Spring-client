import React from 'react'
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    
    <div>
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
          Find your next <span className='text-slate-500'>perfect</span>
          <br />
          Student Management with ease
        </h1>
        <div className='text-gray-400 text-xs sm:text-sm'>
          Kayumba @J88 is the best Company to find your next perfect Students to
          Manage.
          <br />
          We have a wide range of Roles for you to choose from.
        </div>
        <Link
          to={'/sign-in'}
          className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'
        >
          Let's get started...
        </Link>
      </div>
    </div>
  );
}