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
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';
import Landing from './pages/Landing';
import Users from './pages/Users';
import OnlySuperUser from './components/OnlySuperUser';
export default function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/about' element={<About />} />
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route  element={<OnlySuperUser />} >
            <Route path='/users' element={<Users />} />
          </Route>
          <Route path='/home' element={<Home />} />
          <Route path='/new' element={<New />} />
          <Route path='/:studentId/get' element={<Student />} />
          <Route path='/search' element={<Search />} />
          <Route path='/:studentId/edit' element={<EditStudent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}