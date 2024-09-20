import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Index() {
  const [students, setStudents] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const role = currentUser.role;
  const [viewOption, setViewOption] = useState('createdByUser');

  useEffect(() => {
    Load();
  }, [role, viewOption]);

  async function Load() {
    try {
      const token = sessionStorage.getItem('token');
      if (role === 'SUPERUSER' || role === 'ADMIN') {
        if (viewOption === 'all') {
          const response = await axios.get("https://kayumba-jmv-java-spring-boot-backend-apis.onrender.com/api/students", {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          setStudents(response.data.flat());
        } else if (viewOption === 'createdByUser') {
          const response = await axios.get(`https://kayumba-jmv-java-spring-boot-backend-apis.onrender.com/api/${currentUser.id}/students`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          setStudents(response.data.flat());
        }
      } else if (role === 'USER') {
        const response = await axios.get(`https://kayumba-jmv-java-spring-boot-backend-apis.onrender.com/api/${currentUser.id}/students`, {
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
      await axios.delete(`https://kayumba-jmv-java-spring-boot-backend-apis.onrender.com/api/students/${id}/delete`, {
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

  const handleViewOptionChange = (option) => {
    setViewOption(option);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {(role === 'SUPERUSER' || role === 'ADMIN') && (
        <div className="flex items-center mb-4">
          <input
            id="viewAll"
            type="radio"
            value="all"
            checked={viewOption === 'all'}
            onChange={() => handleViewOptionChange('all')}
            className="mr-2"
          />
          <label htmlFor="viewAll" className="text-gray-800 mr-4 cursor-pointer">All Students</label>
          <input
            id="viewCreatedByUser"
            type="radio"
            value="createdByUser"
            checked={viewOption === 'createdByUser'}
            onChange={() => handleViewOptionChange('createdByUser')}
            className="mr-2"
          />
          <label htmlFor="viewCreatedByUser" className="text-gray-800 cursor-pointer">Own Students</label>
        </div>
      )}
      <h1 className="text-3xl font-semibold mb-4 text-gray-800">Beautiful List of Students</h1>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-indigo-500 text-white">
              <th className="border p-3 w-1/6">ID</th>
              <th className="border p-3 w-1/4">First Name</th>
              <th className="border p-3 w-1/4">Last Name</th>
              <th className="border p-3 w-1/3">Email</th>
              {(role !== 'SUPERUSER' && role !== 'ADMIN') || viewOption !== 'all' ? (
                <th className="border p-3">Actions</th>
              ) : null}
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="bg-gray-100 hover:bg-gray-200">
                <td className="border p-3 text-gray-800">{student.id}</td>
                <td className="border p-3 text-gray-800">{student.firstName}</td>
                <td className="border p-3 text-gray-800">{student.lastName}</td>
                <td className="border p-3 text-gray-800">{student.email}</td>
                {(role !== 'SUPERUSER' && role !== 'ADMIN') || viewOption !== 'all' ? (
                  <td className="border p-3">
                    <div className="flex gap-2">
                      {((role === 'SUPERUSER' || role === 'ADMIN') && viewOption === 'all') ? null : (
                        <>
                          <Link to={`/${student.id}/get`} className="text-indigo-600 hover:underline">View</Link>
                          <Link to={`/${student.id}/edit`} className="text-indigo-600 hover:underline">Edit</Link>
                          <button
                            type="button"
                            className="text-red-600 hover:underline"
                            onClick={() => deleteStudentById(student.id)}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {(role !== 'SUPERUSER' && role !== 'ADMIN') || viewOption !== 'all' ? (
        <div className="flex justify-start mt-5">
          <p className="text-gray-800 mr-2">Do you want to add a new student?</p>
          <Link to="/new" className="text-indigo-600 hover:underline ml-2">Add</Link>
        </div>
      ) : null}
    </div>
  );
}
