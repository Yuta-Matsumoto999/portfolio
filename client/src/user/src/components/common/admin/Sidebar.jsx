import React, { useState, useLayoutEffect, useRef } from 'react'
import styled, { useTheme } from 'styled-components';
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Box, Button, ListItem } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { List, ListItemButton, Typography } from '@mui/material';
import { BiCategory, BiSpreadsheet, BiPaste, BiGrid, BiPlayCircle, BiLayer, BiLogOut, BiCaretRight, BiChevronsLeft } from "react-icons/bi";
import useWindowSize from '../../../customHooks/useWindowSize';
import menuItems from '../../../utils/menuItems';
import { setSidebar } from '../../../redux/features/sidebarSlice';
import SidebarItem from './SidebarItem';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';

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

    const handleVisibleSidebar = () => {
        dispatch(setSidebar(!sidebarVisible));
    }

    const drawerWidth = 240;

    return (
        <Drawer
            sx={{ width: drawerWidth,
                flexShrink: 0,
                '.MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    background: "#34346c"
                }, 
            }}
            variant="persistent"
            transitionDuration={200}
            anchor="left"
            open={sidebarVisible}
        >
            <Box sx={{ padding: "0 10px" }}>
                <Box sx={{ display: "flex", justifyContent: "end", alignItems: "center" }}>
                    <IconButton onClick={handleVisibleSidebar} color='white'><BiChevronsLeft size="1.6rem" /></IconButton>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Typography textAlign="center">ここにlogo</Typography>
                </Box>
                
            </Box>
            <Box sx={{ color: "#fff", marginTop: "20px" }}>
                {menuItems.map((item, index) => {
                    return (
                        <SidebarItem item={item} icon={Icon} width={width}/> 
                    )
                })}
            </Box>

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
        </Drawer>

    )
}



export default Sidebar;