import React from 'react'
import styled, { useTheme } from 'styled-components';
import { Box } from '@mui/material'
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar';
import useAdminAuth from '../../../../customHooks/useAdminAuth';
import Header from '../Header';
import authApi from '../../../../api/AdminAuthApi';
import { useDispatch, useSelector } from "react-redux";

const AppLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const authenticate = useAdminAuth();
    const sidebarVisible = useSelector((state) => state.sidebar.value)

    if(authenticate === false) {
        navigate("/admin/login");
    }

    const logout = async () => {
        try {
            await authApi.logout();
            navigate("/admin/login");
        } catch(err) {
            console.log(err);
        }
    }

    const drawerWidth = 240;

    return (
        <div>
            <Box sx={{ display: "flex" }}>
                <Sidebar logout={logout}/>
                <Box sx ={{ flexGrow: 1, width: sidebarVisible ? `calc(100% - ${drawerWidth}px)` : "max-content" , backgroundColor: "#f4f4f4", minHeight: "100vh", height: "100%", marginLeft: sidebarVisible ? 0 : `-${drawerWidth}px` }}>
                    <Header logout={logout}/>
                    <Box>
                        <Outlet />
                    </Box>
                </Box>
            </Box>
        </div>
    )
}

export default AppLayout