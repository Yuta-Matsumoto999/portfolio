import styled, { useTheme } from 'styled-components';
import { Avatar, Typography, Box, Button } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { FaCaretDown } from "react-icons/fa";
import { FaAlignJustify } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { useState } from 'react';
import { setSidebar } from '../../../redux/features/sidebarSlice';
import { useEffect } from 'react';
import { FaBell } from "react-icons/fa";
import { height } from '@mui/system';
import { BiSearchAlt2 } from "react-icons/bi";
import UserMenu from './menu/UserMenu';
import NotificationMenu from './menu/NotificationMenu';

const Input = styled.input`
    border: none;
    outline: none;
    height: 5vh;
    width: 100%;
    background-color: #eee;
    padding: 0 10px;
    border-radius: 5px;
`

const Form = styled.form`
    background-color: #eee;
    width: 80%;
    border: "1px solid #eee";
    border-radius: 5px;

    @media screen and (max-width: 600px) {
        display: none;
    }
`
const SearchButton = styled.button`
    border: none;
    padding: 0 10px;
`

const NotificationButton = styled.button`
    border: none;
    background-color: #fff;
    padding: 0 10px;
    :focus {
        background-color: none;
    }
    @media screen and (max-width:600px) {
        background-color: #34346c ;
    }
`

const Header = (props) => {
    const user = useSelector((state) => state.admin.value);
    const sidebar = useSelector((state) => state.sidebar.value);
    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = useState(null)
    const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
    const open = Boolean(anchorEl)
    const notificationOpen = Boolean(notificationAnchorEl); 

    const handleSidebar = () => {
        dispatch(setSidebar(!sidebar));
    }

    const openUserEditMenuList = (e) => {
        setAnchorEl(e.currentTarget);
    }

    const closeUserEditMenuList = () => {
        setAnchorEl(null);
    }

    const openNotificationList = (e) => {
        setNotificationAnchorEl(e.currentTarget);
    }

    const closeNotificationMenuList = () => {
        setNotificationAnchorEl(null);
    }

    return (
        <div>
            <Box sx={{ backgroundColor:  {"xs":"#34346c", "sm": "#fff" }, display: "flex", alignItems: "center", justifyContent: "space-between", padding: {"xs": "16px", "sm": "0 20px"}, height: {"xs": "10vh", "sm": "8vh"}, borderBottom: {"xs": "none", "sm": "2px solid #ececec"} }}>
                <Form>
                    <Box sx={{ display: {"xs": "none", "sm": "flex"}, alignItems: "center" }}>
                        <Input type="text" placeholder='Search for anyone...'/>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <SearchButton><BiSearchAlt2 size="1.2rem" /></SearchButton>
                        </Box>
                    </Box>
                </Form>
                <Button onClick={handleSidebar} sx={{ padding:  0, display: {"xs": "flex", "sm": "none"}, justifyContent: "start", alignItems: "center" }} color='white'><FaAlignJustify size="20px"/></Button>
                <Typography sx={{ display: {"xs" : "block", "sm": "none"} }}>ここにlogo</Typography>
                <Box sx={{ display: {"xs": "none", "sm": "flex"}, alignItems: "center" }}>
                    <NotificationButton onClick={openNotificationList} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <FaBell color='gray' size="1.1rem"/>
                    </NotificationButton>
                    <NotificationMenu anchorEl={notificationAnchorEl} open={notificationOpen} onClose={closeNotificationMenuList} />
                    <Button onClick={openUserEditMenuList} color='gray' sx={{ display: {"xs": "none", "sm": "flex"} }}>
                        <Avatar sx={{ height: "3.6vh", width: "3.6vh", marginRight: "5px" }} alt={user.name} src="" />
                        <FaCaretDown />
                    </Button>
                    <UserMenu username={user.name} anchorEl={anchorEl} open={open} onClose={closeUserEditMenuList} logout={props.logout}/>
                </Box>
                <Box sx={{ display: {"xs": "flex", "sm": "none"}, alignItems: "center" }}>
                    <NotificationButton onClick={openNotificationList} sx={{ width: "5vh", height: "5vh", alignItems: "center", justifyContent: "end" }}>
                        <FaBell color='white' size="1.1rem" />
                    </NotificationButton>
                    <NotificationMenu anchorEl={notificationAnchorEl} open={notificationOpen} onClose={closeNotificationMenuList} />
                </Box>
            </Box>
        </div>
    )
}

export default Header