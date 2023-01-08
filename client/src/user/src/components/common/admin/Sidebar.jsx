import React, { useState, useEffect, useRef } from 'react'
import styled, { useTheme } from 'styled-components';
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Box, Button } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { List, ListItemButton, Typography } from '@mui/material';
import { BiCategory, BiSpreadsheet, BiPaste, BiGrid, BiPlayCircle, BiLayer, BiLogOut, BiCaretRight } from "react-icons/bi";
import useWindowSize from '../../../customHooks/useWindowSize';
import menuItems from '../../../utils/menuItems';
import { setSidebar } from '../../../redux/features/sidebarSlice';
import SidebarItem from './SidebarItem';

const Icon = styled.i`
    font-size: 1.4rem;
    display: flex;
    alignItems: end;
    @media screen and (min-width: 600px) and (max-width: 900px) {
        font-size: 1.8rem;
    }
`

const Sidebar = (props) => {
    const navigate = useNavigate();
    const sidebarVisible = useSelector((state) => state.sidebar.value)
    const dispatch = useDispatch()

    const [width, height] = useWindowSize();

    const closeSidebar = (e) => {
        const path = e.currentTarget.getAttribute('data-path');
        if(path !== null && width < 600) {
            dispatch(setSidebar(!sidebarVisible));
        }
    }

    return (
        <Box sx={{ display: width < 600 ? sidebarVisible ? "block" : "none" : "block", width: {'xs': "100%", 'sm': 60, 'md': 230}, minHeight: "100vh", position: {"xs": "absolute", "sm": "relative"}, top: {"xs": "10vh", "sm": 0}, zIndex: {"xs": 200, "sm": 1 } }}>
            <List sx={{ width: {'xs': "100%", 'sm': 60, 'md': 230}, backgroundColor: "#34346c", color: "#fff", paddingTop: 0, minHeight: "100vh", height: "100%", paddingBottom: "30px" }}>
                <Box sx={{ marginBottom: {"xs": "10x", "sm": "40px"}, display: {"xs": "none", "sm": "flex"}, justifyContent: "center", alignItems: "center", height: {"xs": "10vh", "sm": "8vh"}, padding: {"xs": "16px"}, borderBottom: "0.3px solid #47525c" }}>
                    <Typography>ここにlogo</Typography>
                </Box>

                {menuItems.map((item, index) => {
                    return (
                        <SidebarItem item={item} index={index} key={index} width={width} icon={Icon} closeSidebar={closeSidebar} />
                    );
                })}

                {/* スマホのみで表示するログアウトボタン */}

                {/* Sign Out */}
                <Button onClick={props.logout} color='white' sx={{ width: "100%", display: {"xs": "block", "sm": "none"}, padding: "18px 15px", opacity: "0.3" }}>
                    <Box sx={{ display: {"xs": "flex", "sm": "none"}, alignItems: "center",  fontSize: "0.9rem" }}>
                        <BiLogOut size={width < 900 && width > 600 ? "1.8rem" : "1.4rem"} />
                        <Typography fontWeight="600" sx={{ marginLeft: "10px", display: {'xs': "block", 'sm': 'none', 'md': "block"} }}>
                            logout
                        </Typography>
                    </Box>
                </Button>
            </List>
        </Box>
    )
}

export default Sidebar