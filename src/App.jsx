import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Index';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import New from './pages/New';
import EditStudent from './pages/EditStudent';
import Student from './pages/Student';
import Header from './components/Header';
import Search from './pages/Search';
import About from './pages/About';

export default function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/home' element={<Home />} />
        <Route path='/new' element={<New />} />
        <Route path='/:studentId/get' element={<Student />} />
        <Route path='/:studentId/edit' element={<EditStudent />} />
        <Route path='/about' element={<About />} />
        <Route path='/search' element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}