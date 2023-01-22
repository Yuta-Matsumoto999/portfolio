import React, { useState, useLayoutEffect, useRef } from 'react'
import styled, { useTheme } from 'styled-components';
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Box, Button, ListItem } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { List, ListItemButton, Typography } from '@mui/material';
import { BiCategory, BiChat, BiPaste, BiGrid, BiPlayCircle, BiCog, BiLogOut, BiBookBookmark , BiChevronsLeft } from "react-icons/bi";
import useWindowSize from '../../../customHooks/useWindowSize';
import { setSidebar } from '../../../redux/features/sidebarSlice';
import SidebarItem from './SidebarItem';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';

const Icon = styled.i`
    font-size: 1.4rem;
    display: flex;
    alignItems: end;
    @media screen and (min-width: 600px) and (max-width: 900px) {
        font-size: 1.8rem;
    }
`

const queryParams = window.location.pathname;
const organization_unique_key = queryParams.split("/")[2];

const menuItems = [
    {
        "name": "Dashboard",
        "path": `/admin/${organization_unique_key}`,
        "judgementActive": undefined,
        "child": null,
        "icon": <BiCategory />,
        "mobileOnly": false
    },
    {
        "name": "Schedule",
        "path": `/admin/${organization_unique_key}/schedule`,
        "judgementActive": "schedule",
        "icon": <BiGrid />,
        "mobileOnly": false
    },
    {
        "name": "Member",
        "path": `/admin/${organization_unique_key}/member`,
        "judgementActive": "member",
        "icon": <BiPaste />,
        "mobileOnly": false
    },
    {
        "name": "Game",
        "path": `/admin/${organization_unique_key}/game`,
        "judgementActive": "game",
        "icon": <BiPlayCircle />,
        "mobileOnly": false
    },
    {
        "name": "Training",
        "path": `/admin/${organization_unique_key}/training`,
        "judgementActive": "training",
        "icon": <BiBookBookmark />,
        "mobileOnly": false
    },
    {
        "name": "Chat",
        "path": `/admin/${organization_unique_key}/chat`,
        "judgementActive": "chat",
        "icon": <BiChat />,
        "mobileOnly": false
    },
    {
        "name": "Settings",
        "path": null,
        "judgementActive": "settings",
        "icon": <BiCog />,
        "child": [
            {
                "name": "Organization",
                "path": `/admin/${organization_unique_key}/settings/organization`,
            },
            {
                "name": "Permission",
                "path": `/admin/${organization_unique_key}/setting/permission`,
            },
            {
                "name": "Role",
                "path": `/admin/${organization_unique_key}/setting/role`,
            }
        ],
        "mobileOnly": false
    },
    {
        "name": "User setting",
        "path": null,
        "judgementActive": "user",
        "icon": null,
        "child": [
            {
                "name": "Your profile",
                "path": `/admin/${organization_unique_key}/profile`,
            },
            {
                "name": "Edit Password",
                "path": `/admin/${organization_unique_key}/password`,
            }
        ],
        "mobileOnly": true,
        "type": "auth"
    }
];

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