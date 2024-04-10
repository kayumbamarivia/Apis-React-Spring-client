import {useEffect, useState} from 'react'
import axios from 'axios'
import { useParams, Link, useNavigate } from 'react-router-dom';

export default function Student() {
  const [student, setStudent] = useState({});
  const {studentId} = useParams()
  const navigate = useNavigate();
  useEffect(() => {
    (async () => getStudentById())();
  }, []);
  
  async function getStudentById() {
      const response = await axios.get(`https://java-spring-boot-backend-apis.onrender.com/api/students/${studentId}/get`);
      setStudent(response.data);
      console.log(response.data);
  }

async function deleteStudentById(id) {
  await axios.delete(`https://java-spring-boot-backend-apis.onrender.com/api/students/${id}/delete`);
  alert("User Deleted Successfully!!");
  navigate('/');
}

return (
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-semibold mb-4 text-gray-800">Beautiful Student</h1>
    <table className="table-auto w-full border border-collapse border-gray-500">
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
                <Link to={`/${student.id}/edit`} className="text-indigo-600 hover:underline">
                  Edit
                </Link>
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
);
}