import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Index() {
  const [students, setStudents] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const role = currentUser.role;
  const [viewOption, setViewOption] = useState('all');

  useEffect(() => {
    Load();
  }, [role,viewOption]);

  async function Load() {
    try {
      const token = sessionStorage.getItem('token');
      if (role === 'SUPERUSER' || role === 'ADMIN') {
        if (viewOption === 'all') {
          const response = await axios.get("https://java-spring-boot-backend-apis.onrender.com/api/students", {
            headers: {
              'Authorization': `Bearer ${token}`
            }
         });
         setStudents(response.data.flat());
        } else if (viewOption === 'createdByUser') {
          const response = await axios.get(`https://java-spring-boot-backend-apis.onrender.com/api/${currentUser.id}/students`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
           });
        setStudents(response.data.flat());
        }
      } else if (role === 'USER') {
        const response = await axios.get(`https://java-spring-boot-backend-apis.onrender.com/api/${currentUser.id}/students`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
           });
        setStudents(response.data.flat());
      }
    } catch (error) {
      console.error('Error loading students:', error);
    }
  }

  async function deleteStudentById(id) {
    try {
      const token = sessionStorage.getItem('token');
      await axios.delete(`https://java-spring-boot-backend-apis.onrender.com/api/students/${id}/delete`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      alert('User Deleted Successfully!!');
      Load();
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  }

  const handleViewOptionChange = option => {
    setViewOption(option);
  };

  return (
    <div className="container mx-auto px-4 py-8">
       {(role === 'SUPERUSER' || role === 'ADMIN') && (
        <div>
          <label>
            <input
              type="radio"
              value="all"
              checked={viewOption === 'all'}
              onChange={() => handleViewOptionChange('all')}
            />
            View All Students
          </label>
          <label>
            <input
              type="radio"
              value="createdByUser"
              checked={viewOption === 'createdByUser'}
              onChange={() => handleViewOptionChange('createdByUser')}
            />
            View Students Created by User
          </label>
        </div>
      )}
      <h1 className="text-3xl font-semibold mb-4 text-gray-800">Beautiful List of Students</h1>
      <div className="overflow-x-auto">
        <table className="w-full whitespace-nowrap">
          <thead>
            <tr className="bg-indigo-500 text-white">
              <th className="border p-3">ID</th>
              <th className="border p-3">First Name</th>
              <th className="border p-3">Last Name</th>
              <th className="border p-3">Email</th>
              <th className="border p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="bg-gray-200">
                <td className="border p-3 text-black">{student.id}</td>
                <td className="border p-3 text-black">{student.firstName}</td>
                <td className="border p-3 text-black">{student.lastName}</td>
                <td className="border p-3 text-black">{student.email}</td>
                <td className="border p-3 text-black">
                  <div className="flex gap-2">
                    <Link to={`/${student.id}/get`} className="text-indigo-600 hover:underline">View</Link>
                    <Link to={`/${student.id}/edit`} className="text-indigo-600 hover:underline">Edit</Link>
                    <button
                      type="button"
                      className="text-red-600 hover:underline"
                      onClick={() => deleteStudentById(student.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-start mt-5">
        <p className="text-gray-800 mr-2">Do you want to add a new student?</p>
        <Link to="/new" className="text-indigo-600 hover:underline">Add</Link>
      </div>
    </div>
  );
}
