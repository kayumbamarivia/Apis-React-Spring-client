import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

export default function OnlySuperUser() {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser.role === 'SUPERUSER' ? <Outlet /> : <Navigate to='/home' />;
}