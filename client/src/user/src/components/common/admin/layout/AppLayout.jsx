import React from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import useAdminAuth from '../../../../customHooks/useAdminAuth';

const AppLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const authenticate = useAdminAuth();

    if(authenticate === false) {
        navigate("/admin/authenticate/login");
    }

  return (
    <div>AppLayout Admin</div>
  )
}

export default AppLayout