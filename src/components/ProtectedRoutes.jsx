import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
    const username = sessionStorage.getItem('username');

  return username ? <Outlet/> : <Navigate to='/login'/>;
}

export default ProtectedRoutes;