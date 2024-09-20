import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function Users() {
  const [users, setUsers] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const role = currentUser.role;

  useEffect(() => {
    Load();
  }, [role]);

  async function Load() {
    try {
        const token = sessionStorage.getItem('token');
        const response = await axios.get("https://kayumba-jmv-java-spring-boot-backend-apis.onrender.com/api/users", {
           headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          setUsers(response.data.flat());
    } catch (error) {
      console.error('Error loading students:', error);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4 text-gray-800">Beautiful List of Users</h1>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-indigo-500 text-white">
              <th className="border p-3 w-1/6">ID</th>
              <th className="border p-3 w-1/4">Name</th>
              <th className="border p-3 w-1/3">Email</th>
              <th className="border p-3 w-1/3">Role</th>
              <th className="border p-3 w-1/3">Profile Image</th>
              </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="bg-gray-100 hover:bg-gray-200">
                <td className="border p-3 text-gray-800">{user.id}</td>
                <td className="border p-3 text-gray-800">{user.name}</td>
                <td className="border p-3 text-gray-800">{user.username}</td>
                <td className="border p-3 text-gray-800">{user.role}</td>
                <td className="border p-3 text-gray-800">
                <img
                className='rounded-full h-7 w-7 object-cover'
                src={user.avatar}
                alt='profile'
              />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
