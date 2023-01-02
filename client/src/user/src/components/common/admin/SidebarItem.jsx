import React, { useState,useEffect, useLayoutEffect, useRef } from 'react'
import { Avatar, Box, List, ListItemButton, Typography } from '@mui/material';
import { Link, useLoaderData, useLocation, useNavigate, useParams, NavLink } from 'react-router-dom';
import { BiCategory, BiSpreadsheet, BiPaste, BiGrid, BiPlayCircle, BiBookBookmark, BiChat, BiCog, BiLogOut, BiCaretRight } from "react-icons/bi";
import { styled } from '@mui/material/styles';
import { setSidebar } from '../../../redux/features/sidebarSlice';
import { useDispatch, useSelector } from "react-redux";
import SidebarSubMenuItem from './SidebarSubMenuItem';
import useUrl from '../../../customHooks/useUrl';

const CustomListItemButton = styled(ListItemButton)({
    width: "100%",
    display: "flex", 
    alignItems: "center",
    padding: "18px 15px", 
    fontSize: "0.9rem",
    opacity: 0.3,
    "&:hover": {
        backgroundColor: "#44448c",
        opacity: 1,
    },
    "&:focus" :{
        backgroundColor: "#44448c",
        opacity: 1,
    },
})

const CustomListItemButtonMobileOnly = styled(ListItemButton) ({
    width: "100%", 
    alignItems: "center", 
    padding: "18px 15px", 
    fontSize: "0.9rem", 
    opacity: "0.3",
    "&:hover": {
        backgroundColor: "#44448c",
        opacity: 1
    },
    "&:focus" :{
        backgroundColor: "#44448c",
        opacity: 1
    },
})

const SidebarItem = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.admin.value);

    const path = useUrl();
    const [open, setOpen] = useState(false);
    const [elementLeft, setElementLeft] = useState();
    const [elementTop, setElementTop] = useState();
    const [elementBottom, setElementBottom] = useState();
    const dropdownListRef = useRef(null);

    useEffect(() => {
        const handleClickToCloseDropdown = (e) => {
            const element = dropdownListRef.current;
            if (!open || element?.contains(e.target)) return;
            setOpen(false);
        }

        window.addEventListener("click", handleClickToCloseDropdown);
        return () => {
            window.removeEventListener("click", handleClickToCloseDropdown);
        };
    },
    [open, dropdownListRef])

    const handleSidebarItem = (e) => {
        setOpen(!open);
        props.closeSidebar(e)

        if(props.width > 600 && props.width < 900) {
            const elementRect = dropdownListRef.current?.getBoundingClientRect();
            setElementTop(elementRect.top);
            setElementLeft(elementRect.right);
            setElementBottom(elementRect.bottom);
        }
    }

    const handleSubMenuItem = () => {
        dispatch(setSidebar(false));
    }

    const Icon = props.icon

    return (
        <>
            {props.item.mobileOnly === false &&
                <CustomListItemButton ref={dropdownListRef} sx={{ backgroundColor: path === props.item.judgementActive ? "#44448c" : undefined, opacity: path === props.item.judgementActive ? 1 : undefined , position: "relative", borderLeft: path === props.item.judgementActive ? "4px solid #6E6EF8" :"none" }} onClick={handleSidebarItem} component={props.item.path ? Link : undefined} to={props.item.path} key={props.index} data-path={props.item.path}>
                    <Icon>
                        {props.item.icon}
                    </Icon>
                    <Typography fontWeight="600" fontSize="1rem" sx={{ marginLeft: "10px", display: {'xs': "block", 'sm': 'none', 'md': "block"} }}>
                        {props.item.name}
                    </Typography>

                </CustomListItemButton>
            }
            {props.item.mobileOnly === true &&
                <CustomListItemButtonMobileOnly ref={dropdownListRef} sx={{ display: {"xs": "flex", "sm": "none"}, backgroundColor: path === props.item.judgementActive ? "#44448c" : undefined, opacity: path === props.item.judgementActive ? 1 : undefined, position: "relative" }} onClick={props.item.child && handleSidebarItem} component={props.item.path ? Link : undefined} to={props.item.path} key={props.index} data-path={props.item.path}>
                    {props.item.type === "auth" &&
                        <>
                            <Avatar sx={{ height: {"xs": "2.8vh", "sm": "3vh"}, width: {"xs": "2.8vh", "sm": "3vh"} }} alt={user.name} src="" />
                            <Typography fontWeight="600" fontSize="1rem" sx={{ marginLeft: "10px", display: {'xs': "block", 'sm': 'none', 'md': "block"} }}>
                                {user.name}
                            </Typography>
                        </>
                    }
                </CustomListItemButtonMobileOnly>
            }
            {props.item.child !== null &&
                    open &&
                    <Box sx={{ backgroundColor: "#44448c", position: {"sm": "absolute", "md": "relative"}, top: {"sm": elementTop, "md": 0 }, left: {"sm": elementLeft, "md": 0 }, width: {"sm": "180px", "md": "100%"}, padding: {"sm": "5px", "md": 0} }}>
                        {props.item.child.map((subMenu, index) => {
                            return (
                                <SidebarSubMenuItem subMenu={subMenu} handleSubMenuItem={handleSubMenuItem} path={path} index={index}/>
                            )
                        })}
                    </Box>
            }
        </>
    )
}

export default SidebarItem