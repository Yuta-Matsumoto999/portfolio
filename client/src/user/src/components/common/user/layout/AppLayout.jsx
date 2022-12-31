import React from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import useGeneralAuth from '../../../../customHooks/useGeneralAuth';

const AppLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const authenticate = useGeneralAuth();

    if(authenticate === false) {
        navigate("/login");
    }

  return (
    <div>AppLayout</div>
  )
}

export default AppLayout