import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoutes(){
  const isLoggedIn = true;

  if (!isLoggedIn) {
    return <Navigate to='/signin' />
  }

  return <Outlet />
}