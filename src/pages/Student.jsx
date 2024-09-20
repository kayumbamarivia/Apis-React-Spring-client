import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

export default function Student() {
  const [student, setStudent] = useState({});
  const { studentId } = useParams();
  const navigate = useNavigate();

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
      setStudent(response.data);
    } catch (error) {
      console.error('Error fetching student:', error);
    }
  }

  async function deleteStudentById(id) {
    try {
      const token = sessionStorage.getItem("token");
      await axios.delete(`https://kayumba-jmv-java-spring-boot-backend-apis.onrender.com/api/student/${id}/delete`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      alert("User Deleted Successfully!!");
      navigate('/home');
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4 text-gray-800">Beautiful Student</h1>
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
            <tr key={student.id} className="bg-gray-200">
              <td className="border p-3 text-black">{student.id}</td>
              <td className="border p-3 text-black">{student.firstName}</td>
              <td className="border p-3 text-black">{student.lastName}</td>
              <td className="border p-3 text-black">{student.email}</td>
              <td className="border p-3 text-black">
                <div className="flex gap-2">
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
          </tbody>
        </table>
      </div>
    </div>
  );
}
