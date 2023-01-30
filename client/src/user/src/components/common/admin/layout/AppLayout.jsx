import React, { useEffect, useState } from 'react'
import styled, { useTheme } from 'styled-components';
import { Box, Typography } from '@mui/material'
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar';
import useAdminAuth from '../../../../customHooks/useAdminAuth';
import Header from '../Header';
import authApi from '../../../../api/AdminAuthApi';
import { useDispatch, useSelector } from "react-redux";
import { compose } from '@mui/system';
import useUrlCheck from '../../../../customHooks/useUrlCheck';
import OrganizationNotFound from '../OrganizationNotFound';
import NotFoundHeader from '../NotFoundHeader';

const AppLayout = () => {
    const navigate = useNavigate();
    const authenticate = useAdminAuth();
    const urlCheck = useUrlCheck();
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
            {urlCheck === true &&
                <Box sx={{ display: "flex" }}>
                    <Sidebar logout={logout} />
                    <Box sx ={{ flexGrow: 1, width: "max-content" , backgroundColor: "#eff0f3", minHeight: "100vh", height: "100%" }}>
                        <Header logout={logout}/>
                        <Box>
                            <Outlet />
                        </Box>
                    </Box>
                </Box>
            }

            {urlCheck === false &&
                <Box>
                    <NotFoundHeader logout={logout}/>
                    <OrganizationNotFound />
                </Box>
            }
        </div>
    )
}

export default AppLayout